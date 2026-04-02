# LumeaScope

The interactive PDF analyst.

LumeaScope is a portfolio project for AI engineering and fullstack development. Users upload technical manuals or contracts and can then chat with the document. The app uses RAG (Retrieval-Augmented Generation) with vector search and citations.

## Goal

We are building a clean, well documented, production-style reference app with a focus on:

- RAG architecture with a vector index
- UX for long documents (upload, table of contents, citations)
- clear technical docs and traceable decisions

## Non-Goals (Scope)

- no full enterprise editor
- no real-time collaboration
- no proprietary OCR stack

## Tech Stack (planned)

- Frontend: Vite + React + Tailwind CSS
- Backend: Supabase (Postgres + pgvector, Auth, Storage, Edge Functions)
- RAG logic: LangChain.js
- Embeddings: OpenAI embeddings (configurable)

## Repo Structure

- `docs/` project documentation
- `docs/architecture/` architecture and data flow
- `docs/adr/` architecture decision records (ADR)
- `docs/features/` feature specs
- `docs/db/` data model and tables
- `docs/api/` API contract
- `docs/ops/` deployment and operations
- `docs/testing/` test strategy
- `docs/ux/` UX notes and UI concepts

## Start With Docs

- `docs/vision.md`
- `docs/requirements.md`
- `docs/architecture/overview.md`
- `docs/architecture/rag-pipeline.md`
- `docs/db/schema.md`

## Milestones

1. Finalize docs and architecture
2. Frontend scaffold (Vite + React + Tailwind)
3. Supabase project and DB schema
4. PDF upload and parsing pipeline
5. Vector index and RAG chat
6. Citations and table of contents
7. Deployment (Vercel)

## License

TBD
