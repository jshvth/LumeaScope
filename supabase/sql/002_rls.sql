-- Row level security policies

alter table documents enable row level security;
alter table document_chunks enable row level security;
alter table chats enable row level security;
alter table chat_messages enable row level security;

create policy "documents_select_own" on documents
  for select using (auth.uid() = user_id);

create policy "documents_insert_own" on documents
  for insert with check (auth.uid() = user_id);

create policy "documents_update_own" on documents
  for update using (auth.uid() = user_id);

create policy "documents_delete_own" on documents
  for delete using (auth.uid() = user_id);

create policy "chunks_select_own" on document_chunks
  for select using (
    exists (
      select 1 from documents d
      where d.id = document_id
      and d.user_id = auth.uid()
    )
  );

create policy "chunks_insert_own" on document_chunks
  for insert with check (
    exists (
      select 1 from documents d
      where d.id = document_id
      and d.user_id = auth.uid()
    )
  );

create policy "chunks_delete_own" on document_chunks
  for delete using (
    exists (
      select 1 from documents d
      where d.id = document_id
      and d.user_id = auth.uid()
    )
  );

create policy "chats_select_own" on chats
  for select using (auth.uid() = user_id);

create policy "chats_insert_own" on chats
  for insert with check (auth.uid() = user_id);

create policy "chats_delete_own" on chats
  for delete using (auth.uid() = user_id);

create policy "messages_select_own" on chat_messages
  for select using (
    exists (
      select 1 from chats c
      where c.id = chat_id
      and c.user_id = auth.uid()
    )
  );

create policy "messages_insert_own" on chat_messages
  for insert with check (
    exists (
      select 1 from chats c
      where c.id = chat_id
      and c.user_id = auth.uid()
    )
  );

create policy "messages_delete_own" on chat_messages
  for delete using (
    exists (
      select 1 from chats c
      where c.id = chat_id
      and c.user_id = auth.uid()
    )
  );
