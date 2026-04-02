# Data Flow

## Upload

- client sends file to upload endpoint
- server stores file in Storage
- document record is created (status: processing)

## Indexing

- parser reads file and produces raw text
- chunker creates chunks with page offsets
- embeddings are computed
- chunks are stored (status: indexed)

## Chat

- user sends question
- vector search fetches relevant chunks
- LLM produces answer with citations
- answer and citations are stored
