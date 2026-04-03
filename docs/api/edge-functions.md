# Edge Functions Setup

This project uses Supabase Edge Functions for RAG ingestion and chat.

## Required Secrets (Supabase Dashboard)

Project Settings -> Edge Functions -> Secrets

Set:

- HF_API_TOKEN
- HF_EMBED_MODEL = sentence-transformers/all-MiniLM-L6-v2
- HF_CHAT_MODEL = mistralai/Mistral-7B-Instruct-v0.2
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY

## Functions

- `ingest`: accepts extracted pages and stores embeddings
- `chat`: runs retrieval and returns an answer + sources

## Deploy (CLI)

```
supabase functions deploy ingest
supabase functions deploy chat
```

## Invoke from frontend

The frontend calls:

- `supabase.functions.invoke('ingest', { body: { document_id, pages } })`
- `supabase.functions.invoke('chat', { body: { document_id, message } })`
