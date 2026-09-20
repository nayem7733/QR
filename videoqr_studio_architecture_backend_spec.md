# VideoQR Studio — Complete Architecture & Setup Guide

## Overview
**VideoQR Studio** transforms uploaded videos (MP4, MOV, WebM) into customizable, high-resolution QR codes that link directly to a fast, clean public playback page.

---

### 1. Database Schema (`supabase.sql`)
```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create videos table
create table public.videos (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete set null,
    video_id text not null unique,
    file_name text not null,
    file_size bigint not null,
    storage_path text not null,
    public_url text not null,
    qr_config jsonb default '{}'::jsonb,
    views_count integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.videos enable row level security;

-- Policies
create policy "Allow public read of videos by video_id"
    on public.videos for select
    using (true);

create policy "Allow anonymous and authenticated uploads"
    on public.videos for insert
    with check (true);

create policy "Allow owners to update their own videos"
    on public.videos for update
    using (auth.uid() = user_id or user_id is null);

create policy "Allow owners to delete their own videos"
    on public.videos for delete
    using (auth.uid() = user_id or user_id is null);

-- Storage bucket setup
insert into storage.buckets (id, name, public) 
values ('videos', 'videos', true)
on conflict (id) do nothing;

create policy "Public Access to Video Bucket"
    on storage.objects for select
    using ( bucket_id = 'videos' );

create policy "Public and Auth Upload to Video Bucket"
    on storage.objects for insert
    with check ( bucket_id = 'videos' );
```

---

### 2. Environment Configuration (`.env.example`)
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...

# Base Domain for Public Video Landing & QR Codes
VITE_APP_URL=https://videoqr.studio
```

---

### 3. Project Structure
```
videoqr-studio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── .env.example
├── supabase.sql
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── lib/
    │   ├── supabase.js
    │   └── qrCustomizer.js
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── VideoUploader.jsx
    │   ├── QRCustomizer.jsx
    │   ├── QRPreview.jsx
    │   ├── VideoCard.jsx
    │   └── ContrastWarning.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── Studio.jsx
    │   ├── Dashboard.jsx
    │   └── VideoPage.jsx
    └── hooks/
        └── useVideoStorage.js
```
