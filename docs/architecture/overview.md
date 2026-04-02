# Architecture Overview

LumeaScope uses a classic RAG pipeline. Documents are stored, processed, split into chunks, embedded, and saved in a vector table. The chat uses semantic search to fetch relevant chunks and generate answers.

## Components

- Frontend (Vite + React) for upload, sidebar, chat
- API or Edge Functions for parsing and indexing
- Supabase Storage for original files
- Postgres + pgvector for chunks and embeddings
- LLM provider for embeddings and answers

## Data Objects

- Document: metadata, status, table of contents
- Chunk: text, page range, vector
- Message: chat history per document

## Interfaces

- Upload endpoint
- Indexing job
- Search endpoint
- Chat endpoint
