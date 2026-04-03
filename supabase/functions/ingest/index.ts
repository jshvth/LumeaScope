import { serve } from 'https://deno.land/std@0.203.0/http/server.ts'
import { supabaseAdmin } from '../_shared/supabase.ts'
import { embedText } from '../_shared/hf.ts'
import { corsHeaders } from '../_shared/cors.ts'

interface PagePayload {
  page_number: number
  text: string
}

interface IngestPayload {
  document_id: string
  pages: PagePayload[]
}

const CHUNK_SIZE = 900
const CHUNK_OVERLAP = 150
const MAX_CHUNKS = 200

function chunkPages(pages: PagePayload[]) {
  const chunks: {
    content: string
    page_start: number
    page_end: number
    chunk_index: number
  }[] = []

  let chunkIndex = 0

  for (const page of pages) {
    const cleaned = page.text.replace(/\s+/g, ' ').trim()
    if (!cleaned) continue

    let start = 0
    while (start < cleaned.length) {
      const end = Math.min(start + CHUNK_SIZE, cleaned.length)
      const content = cleaned.slice(start, end)

      chunks.push({
        content,
        page_start: page.page_number,
        page_end: page.page_number,
        chunk_index: chunkIndex,
      })

      chunkIndex += 1
      if (chunks.length >= MAX_CHUNKS) return chunks
      start = end - CHUNK_OVERLAP
      if (start < 0) start = 0
    }
  }

  return chunks
}

serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders })
    }
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 })
    }

    const payload = (await req.json()) as IngestPayload

    if (!payload?.document_id || !payload?.pages?.length) {
      return new Response('Invalid payload', { status: 400 })
    }

    const authHeader = req.headers.get('Authorization') ?? ''
    const token = authHeader.replace('Bearer ', '')
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.getUser(token)

    if (authError || !authData?.user) {
      return new Response('Unauthorized', { status: 401, headers: corsHeaders })
    }

    const { data: doc, error: docError } = await supabaseAdmin
      .from('documents')
      .select('id,user_id')
      .eq('id', payload.document_id)
      .single()

    if (docError || !doc) {
      return new Response('Document not found', { status: 404, headers: corsHeaders })
    }

    if (doc.user_id !== authData.user.id) {
      return new Response('Forbidden', { status: 403, headers: corsHeaders })
    }

    await supabaseAdmin
      .from('documents')
      .update({ status: 'processing' })
      .eq('id', payload.document_id)

    const chunks = chunkPages(payload.pages)

    const rows = []
    for (const chunk of chunks) {
      const embedding = await embedText(chunk.content)
      rows.push({
        document_id: payload.document_id,
        content: chunk.content,
        page_start: chunk.page_start,
        page_end: chunk.page_end,
        chunk_index: chunk.chunk_index,
        embedding,
      })
    }

    if (rows.length > 0) {
      const { error } = await supabaseAdmin.from('document_chunks').insert(rows)
      if (error) throw new Error(error.message)
    }

    await supabaseAdmin
      .from('documents')
      .update({ status: 'indexed' })
      .eq('id', payload.document_id)

    return new Response(
      JSON.stringify({ ok: true, chunks: rows.length }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }
})
