-- Run this once in the Supabase SQL editor

create table if not exists classmates (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  email text,
  linkedin text,
  city text,
  ig text,
  article_1 text,
  article_2 text,
  yearbook_quote text,
  image_url text,
  approved boolean default false
);

alter table classmates enable row level security;

-- classmates.html can only see approved rows
create policy "public read approved"
  on classmates for select
  using (approved = true);

-- submit_classmate.html can insert new rows, but only as unapproved
create policy "public insert unapproved"
  on classmates for insert
  with check (approved = false);

-- Storage: create a public bucket named "classmate-photos" in the
-- Supabase dashboard (Storage > New bucket > Public bucket).
-- No SQL needed for that part.
