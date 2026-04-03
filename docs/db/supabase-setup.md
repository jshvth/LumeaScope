# Supabase Setup

This project uses Supabase for Auth, Storage, and Postgres + pgvector.

## Prerequisites

- Supabase project created (you already have `LumeaScope`)
- SQL editor access

## Step 1: Core schema

Run `supabase/sql/001_schema.sql` in the Supabase SQL editor.

Notes:
- `embedding vector(1536)` assumes OpenAI text-embedding-3-small. Adjust if you use a different dimension.
- `pgcrypto` is used for UUID generation.

## Step 2: Row Level Security (RLS)

Run `supabase/sql/002_rls.sql` to lock down access per user.

## Step 3: Storage bucket and policies

Run `supabase/sql/003_storage.sql`.

Conventions:
- Store files under `<user_id>/<filename>` for policy enforcement.

## Step 4: Embeddings + RPC

Run `supabase/sql/004_embeddings.sql` to:
- set embedding dimension to 384 (HF MiniLM)
- add `match_document_chunks` RPC for vector search

## After setup

- Create a `.env` file in the frontend later with Supabase URL and anon key.
- Use the service role key only on the server or Edge Functions.
