-- Safe version that doesn't drop existing tables
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  company VARCHAR(255),
  role VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_progress table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  total_xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  completed_challenges TEXT[] DEFAULT ARRAY[]::TEXT[],
  badges TEXT[] DEFAULT ARRAY[]::TEXT[],
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create sessions table for auth if it doesn't exist
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);

-- Insert demo users safely
DO $$
BEGIN
  -- Insert demo user
  IF NOT EXISTS (SELECT 1 FROM user_profiles WHERE email = 'demo@metaphoenix.co.sz') THEN
    INSERT INTO user_profiles (email, full_name, company, role)
    VALUES ('demo@metaphoenix.co.sz', 'Demo User', 'Meta-Phoenix', 'Security Researcher');
  END IF;

  -- Insert john doe
  IF NOT EXISTS (SELECT 1 FROM user_profiles WHERE email = 'john.doe@example.com') THEN
    INSERT INTO user_profiles (email, full_name, company, role)
    VALUES ('john.doe@example.com', 'John Doe', 'TechCorp', 'Security Analyst');
  END IF;

  -- Insert jane smith
  IF NOT EXISTS (SELECT 1 FROM user_profiles WHERE email = 'jane.smith@example.com') THEN
    INSERT INTO user_profiles (email, full_name, company, role)
    VALUES ('jane.smith@example.com', 'Jane Smith', 'CyberSafe Inc', 'CISO');
  END IF;
END $$;

-- Insert user progress safely
DO $$
DECLARE
  demo_user_id UUID;
  john_user_id UUID;
  jane_user_id UUID;
BEGIN
  -- Get user IDs
  SELECT id INTO demo_user_id FROM user_profiles WHERE email = 'demo@metaphoenix.co.sz';
  SELECT id INTO john_user_id FROM user_profiles WHERE email = 'john.doe@example.com';
  SELECT id INTO jane_user_id FROM user_profiles WHERE email = 'jane.smith@example.com';

  -- Insert progress for demo user
  IF demo_user_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM user_progress WHERE user_id = demo_user_id) THEN
    INSERT INTO user_progress (user_id, total_xp, level, badges)
    VALUES (demo_user_id, 1500, 4, ARRAY['Research Contributor', 'AI Security Expert']);
  END IF;

  -- Insert progress for john
  IF john_user_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM user_progress WHERE user_id = john_user_id) THEN
    INSERT INTO user_progress (user_id, total_xp, level, badges)
    VALUES (john_user_id, 1250, 3, ARRAY['Network Security Expert', 'Threat Hunter']);
  END IF;

  -- Insert progress for jane
  IF jane_user_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM user_progress WHERE user_id = jane_user_id) THEN
    INSERT INTO user_progress (user_id, total_xp, level, badges)
    VALUES (jane_user_id, 2100, 5, ARRAY['Security Leader', 'Compliance Expert']);
  END IF;

  RAISE NOTICE 'Auth tables setup completed successfully!';
END $$;
