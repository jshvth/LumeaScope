# ADR-0002: Backend with Supabase

## Status

Accepted

## Context

We need auth, storage, database, and an edge function runtime. Self hosting would take too long.

## Decision

Supabase is used as the backend (Postgres, Auth, Storage, Edge Functions).

## Consequences

- fast start with strong defaults
- pgvector directly in Postgres
- vendor lock in is acceptable for a portfolio project
