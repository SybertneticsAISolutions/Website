-- Create admin_users table for Supabase authentication
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users table
CREATE POLICY "Admin users can view all admin users" ON admin_users
  FOR SELECT USING (auth.uid() IN (
    SELECT user_id FROM admin_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Admin users can insert admin users" ON admin_users
  FOR INSERT WITH CHECK (auth.uid() IN (
    SELECT user_id FROM admin_users WHERE user_id = auth.uid()
  ));

CREATE POLICY "Admin users can update admin users" ON admin_users
  FOR UPDATE USING (auth.uid() IN (
    SELECT user_id FROM admin_users WHERE user_id = auth.uid()
  ));

-- Insert your admin user (replace with your actual email)
INSERT INTO admin_users (user_id, email, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'kaynenbpellegrino@sybertnetics.com'),
  'kaynenbpellegrino@sybertnetics.com',
  'admin'
) ON CONFLICT (user_id) DO NOTHING;

-- Create function to automatically create admin user record
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the new user should be an admin
  IF NEW.email = 'kaynenbpellegrino@sybertnetics.com' THEN
    INSERT INTO admin_users (user_id, email, role)
    VALUES (NEW.id, NEW.email, 'admin');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically handle new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user(); 