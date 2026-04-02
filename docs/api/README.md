# API Contract (Draft)

## Upload

- POST /api/documents
- Body: multipart file
- Response: document id

## Indexing Status

- GET /api/documents/:id
- Response: status, title, toc

## Chat

- POST /api/chat
- Body: document_id, message
- Response: answer, sources

## Search (optional)

- POST /api/search
- Body: document_id, query
- Response: chunks + metadata
