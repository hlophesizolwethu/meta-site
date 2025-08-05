-- Update company_info table for cybersecurity focus
ALTER TABLE company_info 
ADD COLUMN IF NOT EXISTS security_certifications TEXT[],
ADD COLUMN IF NOT EXISTS research_areas TEXT[];

-- Create security_services table
CREATE TABLE IF NOT EXISTS security_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  features TEXT[], -- Array of features
  icon_type VARCHAR(50), -- threat, network, data, shield, lock, alert
  threat_level VARCHAR(20), -- Critical, High, Medium, Low
  price_range VARCHAR(100),
  active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create research_projects table
CREATE TABLE IF NOT EXISTS research_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50), -- Published, In Progress, Under Review, Completed
  publication_date DATE,
  researchers TEXT[], -- Array of researcher names
  tags TEXT[], -- Array of research tags
  paper_url TEXT,
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create security_challenges table (for gamification)
CREATE TABLE IF NOT EXISTS security_challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty_level VARCHAR(20), -- Beginner, Intermediate, Advanced, Expert
  xp_reward INTEGER DEFAULT 0,
  category VARCHAR(100), -- Network Security, Malware Analysis, Cryptography, etc.
  challenge_type VARCHAR(50), -- CTF, Simulation, Quiz, Lab
  active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_progress table (for XP tracking)
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID, -- Will be linked to auth system
  total_xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  completed_challenges UUID[], -- Array of completed challenge IDs
  badges TEXT[], -- Array of earned badges
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create threat_intelligence table
CREATE TABLE IF NOT EXISTS threat_intelligence (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  threat_name VARCHAR(255) NOT NULL,
  threat_type VARCHAR(100), -- Malware, Phishing, DDoS, etc.
  severity_level VARCHAR(20), -- Critical, High, Medium, Low
  description TEXT,
  indicators TEXT[], -- Array of IOCs
  mitigation_steps TEXT[],
  first_seen DATE,
  last_updated DATE,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
