const hfToken = Deno.env.get('HF_API_TOKEN') ?? ''
const hfEmbedModel =
  Deno.env.get('HF_EMBED_MODEL') ?? 'sentence-transformers/all-MiniLM-L6-v2'
const hfChatModel =
  Deno.env.get('HF_CHAT_MODEL') ?? 'mistralai/Mistral-7B-Instruct-v0.2'

export const hfConfig = {
  token: hfToken,
  embedModel: hfEmbedModel,
  chatModel: hfChatModel,
}

export async function embedText(text: string): Promise<number[]> {
  const response = await fetch(
    `https://api-inference.huggingface.co/pipeline/feature-extraction/${hfConfig.embedModel}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${hfConfig.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text, options: { wait_for_model: true } }),
    },
  )

  if (!response.ok) {
    throw new Error(`HF embeddings error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('HF embeddings returned empty result')
  }

  if (Array.isArray(data[0])) {
    const vector = data[0]
    if (Array.isArray(vector[0])) {
      return meanPool(vector as number[][])
    }
    return vector as number[]
  }

  return data as number[]
}

export async function generateAnswer(prompt: string): Promise<string> {
  const response = await fetch(
    `https://api-inference.huggingface.co/models/${hfConfig.chatModel}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${hfConfig.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 300,
          temperature: 0.2,
          return_full_text: false,
        },
        options: { wait_for_model: true },
      }),
    },
  )

  if (!response.ok) {
    throw new Error(`HF chat error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()

  if (Array.isArray(data) && data[0]?.generated_text) {
    return data[0].generated_text as string
  }

  if (data?.generated_text) {
    return data.generated_text as string
  }

  return typeof data === 'string' ? data : 'No response generated.'
}

function meanPool(tokens: number[][]): number[] {
  const dims = tokens[0]?.length ?? 0
  const totals = new Array(dims).fill(0)
  for (const token of tokens) {
    for (let i = 0; i < dims; i += 1) {
      totals[i] += token[i]
    }
  }
  return totals.map((value) => value / tokens.length)
}
