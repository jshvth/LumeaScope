-- Storage policies for documents bucket
-- Assumes files stored under path: <user_id>/<filename>

insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do nothing;

create policy "documents_bucket_read" on storage.objects
  for select using (
    bucket_id = 'documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "documents_bucket_insert" on storage.objects
  for insert with check (
    bucket_id = 'documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "documents_bucket_delete" on storage.objects
  for delete using (
    bucket_id = 'documents'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
