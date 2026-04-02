# ADR-0003: Vector Search via pgvector

## Status

Accepted

## Context

We need semantic search with embeddings. External vector DBs like Pinecone are possible, but we want less infrastructure.

## Decision

We use pgvector in Supabase Postgres for vector search.

## Consequences

- fewer services, simpler maintenance
- good performance for medium sized datasets
- watch scaling limits, optional Pinecone later
