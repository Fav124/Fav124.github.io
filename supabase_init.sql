-- RUN THIS IN YOUR SUPABASE SQL EDITOR

-- 0. Enable Extension for UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table for Contact Messages (Form Kontak)
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table for Dynamic Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  repo_url TEXT,
  demo_url TEXT,
  tech_stack TEXT[],
  is_featured BOOLEAN DEFAULT false,
  content TEXT, -- Markdown content for detail page
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Table for Realtime Client Chats
CREATE TABLE IF NOT EXISTS chats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender_id TEXT NOT NULL, -- Client unique ID
  message TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Tables for Resume (Optional, for higher automation)
CREATE TABLE IF NOT EXISTS experiences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT,
  period TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS education (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  school TEXT NOT NULL,
  major TEXT,
  period TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE projects;
ALTER PUBLICATION supabase_realtime ADD TABLE chats;

-- 6. Set RLS (Row Level Security)
-- MESSAGES: Public can insert, Admin can read
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for everyone" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for authenticated only" ON messages FOR SELECT TO authenticated USING (true);

-- PROJECTS: Public can read, Admin can all
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read for everyone" ON projects FOR SELECT USING (true);
CREATE POLICY "Enable all for admin" ON projects FOR ALL TO authenticated USING (true);

-- CHATS: Public can insert & read (simplified for client access), Admin can all
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable public chat access" ON chats FOR ALL USING (true);

-- RESUME TABLES: Admin only managed
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Admin manage experiences" ON experiences FOR ALL TO authenticated USING (true);

ALTER TABLE education ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read education" ON education FOR SELECT USING (true);
CREATE POLICY "Admin manage education" ON education FOR ALL TO authenticated USING (true);
