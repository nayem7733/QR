create extension if not exists "uuid-ossp";

create table if not exists public.videos (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete set null,
  video_id text not null unique,
  file_name text not null,
  file_size bigint not null,
  storage_path text not null,
  public_url text not null,
  qr_config jsonb not null default '{}'::jsonb,
  views_count bigint not null default 0,
  created_at timestamptz not null default now()
);

alter table public.videos enable row level security;
drop policy if exists "videos_public_read" on public.videos;
drop policy if exists "videos_public_insert" on public.videos;
drop policy if exists "videos_owner_delete" on public.videos;
create policy "videos_public_read" on public.videos for select using (true);
create policy "videos_public_insert" on public.videos for insert with check (true);
create policy "videos_owner_delete" on public.videos for delete using (auth.uid() = user_id or user_id is null);

create or replace function public.increment_video_view(p_video_id text) returns void language sql security definer set search_path=public as $$
  update public.videos set views_count=views_count+1 where video_id=p_video_id;
$$;
grant execute on function public.increment_video_view(text) to anon, authenticated;

insert into storage.buckets(id,name,public) values('videos','videos',true) on conflict(id) do nothing;
drop policy if exists "videos_storage_read" on storage.objects;
drop policy if exists "videos_storage_insert" on storage.objects;
drop policy if exists "videos_storage_delete" on storage.objects;
create policy "videos_storage_read" on storage.objects for select using (bucket_id='videos');
create policy "videos_storage_insert" on storage.objects for insert with check (bucket_id='videos');
create policy "videos_storage_delete" on storage.objects for delete using (bucket_id='videos');
