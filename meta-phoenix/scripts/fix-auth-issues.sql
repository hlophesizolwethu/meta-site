-- Comprehensive fix for auth issues
DO $$
DECLARE
  error_count INTEGER := 0;
BEGIN
  RAISE NOTICE '=== FIXING AUTH ISSUES ===';
  RAISE NOTICE '';
  
  -- Step 1: Ensure UUID extension exists
  BEGIN
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    RAISE NOTICE '✅ UUID extension ensured';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '❌ Failed to create UUID extension: %', SQLERRM;
    error_count := error_count + 1;
  END;
  
  -- Step 2: Create user_profiles table
  BEGIN
    CREATE TABLE IF NOT EXISTS user_profiles (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      full_name VARCHAR(255),
      company VARCHAR(255),
      role VARCHAR(100),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    RAISE NOTICE '✅ user_profiles table ensured';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '❌ Failed to create user_profiles: %', SQLERRM;
    error_count := error_count + 1;
  END;
  
  -- Step 3: Create user_progress table
  BEGIN
    CREATE TABLE IF NOT EXISTS user_progress (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID,
      total_xp INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1,
      completed_challenges TEXT[] DEFAULT ARRAY[]::TEXT[],
      badges TEXT[] DEFAULT ARRAY[]::TEXT[],
      last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    RAISE NOTICE '✅ user_progress table ensured';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '❌ Failed to create user_progress: %', SQLERRM;
    error_count := error_count + 1;
  END;
  
  -- Step 4: Create user_sessions table
  BEGIN
    CREATE TABLE IF NOT EXISTS user_sessions (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID,
      session_token VARCHAR(255) UNIQUE NOT NULL,
      expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    RAISE NOTICE '✅ user_sessions table ensured';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '❌ Failed to create user_sessions: %', SQLERRM;
    error_count := error_count + 1;
  END;
  
  -- Step 5: Add foreign key constraints (if they don't exist)
  BEGIN
    -- Check if foreign key exists for user_progress
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'user_progress_user_id_fkey' 
      AND table_name = 'user_progress'
    ) THEN
      ALTER TABLE user_progress 
      ADD CONSTRAINT user_progress_user_id_fkey 
      FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE;
      RAISE NOTICE '✅ Added foreign key constraint to user_progress';
    END IF;
    
    -- Check if foreign key exists for user_sessions
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'user_sessions_user_id_fkey' 
      AND table_name = 'user_sessions'
    ) THEN
      ALTER TABLE user_sessions 
      ADD CONSTRAINT user_sessions_user_id_fkey 
      FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE;
      RAISE NOTICE '✅ Added foreign key constraint to user_sessions';
    END IF;
    
    -- Add unique constraint to user_progress if it doesn't exist
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'user_progress_user_id_key' 
      AND table_name = 'user_progress'
    ) THEN
      ALTER TABLE user_progress ADD CONSTRAINT user_progress_user_id_key UNIQUE (user_id);
      RAISE NOTICE '✅ Added unique constraint to user_progress';
    END IF;
    
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '⚠️  Warning adding constraints: %', SQLERRM;
  END;
  
  -- Step 6: Create indexes
  BEGIN
    CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
    CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
    CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
    CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
    RAISE NOTICE '✅ Indexes created';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '⚠️  Warning creating indexes: %', SQLERRM;
  END;
  
  RAISE NOTICE '';
  IF error_count = 0 THEN
    RAISE NOTICE '🎉 All auth tables fixed successfully!';
  ELSE
    RAISE NOTICE '⚠️  Completed with % errors - check messages above', error_count;
  END IF;
END $$;
