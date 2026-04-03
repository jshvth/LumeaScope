-- Update embedding dimension for HF MiniLM (384 dims)
-- Run only if document_chunks is empty or embeddings are not in use

alter table document_chunks
  alter column embedding type vector(384) using embedding::vector(384);

drop index if exists document_chunks_embedding_idx;
create index if not exists document_chunks_embedding_idx
  on document_chunks using ivfflat (embedding vector_cosine_ops) with (lists = 100);

create or replace function match_document_chunks(
  query_embedding vector(384),
  match_count int,
  match_document_id uuid
)
returns table (
  id uuid,
  document_id uuid,
  content text,
  page_start int,
  page_end int,
  similarity float
)
language sql stable as $$
  select
    id,
    document_id,
    content,
    page_start,
    page_end,
    1 - (embedding <=> query_embedding) as similarity
  from document_chunks
  where document_id = match_document_id
  order by embedding <=> query_embedding
  limit match_count;
$$;
