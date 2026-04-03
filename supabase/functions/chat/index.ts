import { serve } from 'https://deno.land/std@0.203.0/http/server.ts'
import { supabaseAdmin } from '../_shared/supabase.ts'
import { embedText, generateAnswer } from '../_shared/hf.ts'

interface ChatPayload {
  document_id: string
  message: string
}

serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 })
    }

    const payload = (await req.json()) as ChatPayload
    if (!payload?.document_id || !payload?.message) {
      return new Response('Invalid payload', { status: 400 })
    }

    const authHeader = req.headers.get('Authorization') ?? ''
    const token = authHeader.replace('Bearer ', '')
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.getUser(token)

    if (authError || !authData?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const { data: doc, error: docError } = await supabaseAdmin
      .from('documents')
      .select('id,user_id')
      .eq('id', payload.document_id)
      .single()

    if (docError || !doc) {
      return new Response('Document not found', { status: 404 })
    }

    if (doc.user_id !== authData.user.id) {
      return new Response('Forbidden', { status: 403 })
    }

    const queryEmbedding = await embedText(payload.message)

    const { data: matches, error } = await supabaseAdmin.rpc(
      'match_document_chunks',
      {
        query_embedding: queryEmbedding,
        match_count: 6,
        match_document_id: payload.document_id,
      },
    )

    if (error) throw new Error(error.message)

    const context = (matches ?? [])
      .map(
        (chunk: any, index: number) =>
          `[${index + 1}] (pages ${chunk.page_start}-${chunk.page_end}) ${chunk.content}`,
      )
      .join('\n\n')

    const prompt = `You are a helpful assistant. Use only the context to answer.\n\nContext:\n${context}\n\nQuestion: ${payload.message}\n\nAnswer:`

    const answer = await generateAnswer(prompt)

    const sources = (matches ?? []).map((chunk: any, index: number) => ({
      id: chunk.id,
      page_start: chunk.page_start,
      page_end: chunk.page_end,
      content: chunk.content,
      rank: index + 1,
      similarity: chunk.similarity,
    }))

    return new Response(JSON.stringify({ answer, sources }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
