# RAG Pipeline

## Steps

1. Upload: PDF stored in Supabase Storage
2. Parsing: extract text and page offsets
3. Chunking: split text into meaningful sections
4. Embedding: convert each chunk into a vector
5. Storage: text + vector stored in Postgres (pgvector)
6. Retrieval: semantic search returns top K chunks
7. Generation: LLM produces an answer with citations

## Chunking Rules

- length between 500 and 1000 characters
- keep page references per chunk
- overlap for context

## Failure Scenarios

- PDF without text layer: show feedback and alternative (OCR later)
- File too large: limit with clear error
- Model failure: retry with backoff
