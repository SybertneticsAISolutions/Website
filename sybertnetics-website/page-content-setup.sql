-- Create page_content table for storing dynamic page content
CREATE TABLE IF NOT EXISTS page_content (
  id SERIAL PRIMARY KEY,
  page_path TEXT UNIQUE NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;

-- Create policies for page_content table
-- Allow public read access to all content
CREATE POLICY "Public read access to page content" ON page_content
  FOR SELECT USING (true);

-- Allow admin users to insert/update content
CREATE POLICY "Admin users can insert page content" ON page_content
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT user_id FROM admin_users WHERE user_id = auth.uid())
  );

CREATE POLICY "Admin users can update page content" ON page_content
  FOR UPDATE USING (
    auth.uid() IN (SELECT user_id FROM admin_users WHERE user_id = auth.uid())
  );

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_page_content_path ON page_content(page_path);

-- Insert some sample content
INSERT INTO page_content (page_path, content) VALUES
  ('home', '# Welcome to Sybertnetics\n\nWe are building the future of AI.'),
  ('about', '# About Us\n\nSybertnetics is at the forefront of AI innovation.'),
  ('runedrive', '# RuneDrive\n\nThe collaborative TTRPG platform.')
ON CONFLICT (page_path) DO NOTHING; 