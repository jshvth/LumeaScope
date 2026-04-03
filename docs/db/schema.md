# Data Model

## Tables

- documents
- document_chunks
- chats
- chat_messages

## documents

- id (uuid)
- user_id (uuid)
- title (text)
- storage_path (text)
- status (text: uploaded, processing, indexed, failed)
- toc_json (jsonb)
- created_at (timestamp)

## document_chunks

- id (uuid)
- document_id (uuid)
- page_start (int)
- page_end (int)
- chunk_index (int)
- content (text)
- embedding (vector, 384 dims for HF MiniLM)
- created_at (timestamp)

## chats

- id (uuid)
- document_id (uuid)
- user_id (uuid)
- created_at (timestamp)

## chat_messages

- id (uuid)
- chat_id (uuid)
- role (text: user, assistant)
- content (text)
- sources (jsonb)
- created_at (timestamp)
