# Feature: Indexing

## Goal

After upload the document is processed, chunked, and embedded.

## Flow

- parsing (text + pages)
- chunking with overlap
- compute embeddings
- store in document_chunks

## Success Criteria

- status becomes indexed
- chunks include page references
