-- RUN THIS IN YOUR SUPABASE SQL EDITOR

-- 1. Table for Dynamic Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  repo_url TEXT,
  demo_url TEXT,
  tech_stack TEXT[], -- Array of strings
  is_featured BOOLEAN DEFAULT false,
  content TEXT, -- Markdown content for detail page
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table for Realtime Client Chats
CREATE TABLE IF NOT EXISTS chats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender_id TEXT NOT NULL, -- Client unique ID
  message TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Realtime for these tables
ALTER PUBLICATION supabase_realtime ADD TABLE projects;
ALTER PUBLICATION supabase_realtime ADD TABLE chats;

-- 4. Set RLS (Row Level Security) - Simple policy for now
-- Allow everyone to read projects
CREATE POLICY "Enable read access for all users" ON projects FOR SELECT USING (true);
-- Only authenticated users (you) can insert/update/delete projects
CREATE POLICY "Enable all access for admin only" ON projects FOR ALL TO authenticated USING (true);

-- Allow clients to insert/read their own chats (simplified for demo)
CREATE POLICY "Enable public insert for chats" ON chats FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable public read for chats" ON chats FOR SELECT USING (true);
