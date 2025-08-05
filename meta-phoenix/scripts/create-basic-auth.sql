-- Create basic auth tables without dependencies
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS user_sessions CASCADE;
DROP TABLE IF EXISTS user_progress CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;

-- Create user profiles table
CREATE TABLE user_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  company VARCHAR(255),
  role VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_progress table
CREATE TABLE user_progress (
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

-- Create sessions table for auth
CREATE TABLE user_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_user_profiles_email ON user_profiles(email);
CREATE INDEX idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);

-- Insert demo users (using INSERT with WHERE NOT EXISTS to avoid conflicts)
INSERT INTO user_profiles (email, full_name, company, role)
SELECT 'demo@metaphoenix.co.sz', 'Demo User', 'Meta-Phoenix', 'Security Researcher'
WHERE NOT EXISTS (SELECT 1 FROM user_profiles WHERE email = 'demo@metaphoenix.co.sz');

INSERT INTO user_profiles (email, full_name, company, role)
SELECT 'john.doe@example.com', 'John Doe', 'TechCorp', 'Security Analyst'
WHERE NOT EXISTS (SELECT 1 FROM user_profiles WHERE email = 'john.doe@example.com');

INSERT INTO user_profiles (email, full_name, company, role)
SELECT 'jane.smith@example.com', 'Jane Smith', 'CyberSafe Inc', 'CISO'
WHERE NOT EXISTS (SELECT 1 FROM user_profiles WHERE email = 'jane.smith@example.com');

-- Insert user progress for demo users
INSERT INTO user_progress (user_id, total_xp, level, badges)
SELECT 
  up.id,
  1500,
  4,
  ARRAY['Research Contributor', 'AI Security Expert']
FROM user_profiles up
WHERE up.email = 'demo@metaphoenix.co.sz'
AND NOT EXISTS (SELECT 1 FROM user_progress WHERE user_id = up.id);

INSERT INTO user_progress (user_id, total_xp, level, badges)
SELECT 
  up.id,
  1250,
  3,
  ARRAY['Network Security Expert', 'Threat Hunter']
FROM user_profiles up
WHERE up.email = 'john.doe@example.com'
AND NOT EXISTS (SELECT 1 FROM user_progress WHERE user_id = up.id);

INSERT INTO user_progress (user_id, total_xp, level, badges)
SELECT 
  up.id,
  2100,
  5,
  ARRAY['Security Leader', 'Compliance Expert']
FROM user_profiles up
WHERE up.email = 'jane.smith@example.com'
AND NOT EXISTS (SELECT 1 FROM user_progress WHERE user_id = up.id);

-- Verify the setup
DO $$
DECLARE
  user_count INTEGER;
  progress_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO user_count FROM user_profiles;
  SELECT COUNT(*) INTO progress_count FROM user_progress;
  
  RAISE NOTICE 'Setup completed successfully!';
  RAISE NOTICE 'User profiles created: %', user_count;
  RAISE NOTICE 'User progress records: %', progress_count;
  
  IF user_count = 0 THEN
    RAISE EXCEPTION 'No users were created. Check for errors.';
  END IF;
END $$;
