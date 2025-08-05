-- Troubleshooting script for auth issues
DO $$
DECLARE
  table_count INTEGER;
  user_count INTEGER;
  progress_count INTEGER;
  session_count INTEGER;
BEGIN
  RAISE NOTICE '=== TROUBLESHOOTING AUTH SETUP ===';
  RAISE NOTICE '';
  
  -- Check if tables exist
  SELECT COUNT(*) INTO table_count 
  FROM information_schema.tables 
  WHERE table_name = 'user_profiles' AND table_schema = 'public';
  
  IF table_count > 0 THEN
    RAISE NOTICE '✅ user_profiles table exists';
    SELECT COUNT(*) INTO user_count FROM user_profiles;
    RAISE NOTICE '   └── Records: %', user_count;
  ELSE
    RAISE NOTICE '❌ user_profiles table missing';
  END IF;
  
  SELECT COUNT(*) INTO table_count 
  FROM information_schema.tables 
  WHERE table_name = 'user_progress' AND table_schema = 'public';
  
  IF table_count > 0 THEN
    RAISE NOTICE '✅ user_progress table exists';
    SELECT COUNT(*) INTO progress_count FROM user_progress;
    RAISE NOTICE '   └── Records: %', progress_count;
  ELSE
    RAISE NOTICE '❌ user_progress table missing';
  END IF;
  
  SELECT COUNT(*) INTO table_count 
  FROM information_schema.tables 
  WHERE table_name = 'user_sessions' AND table_schema = 'public';
  
  IF table_count > 0 THEN
    RAISE NOTICE '✅ user_sessions table exists';
    SELECT COUNT(*) INTO session_count FROM user_sessions;
    RAISE NOTICE '   └── Records: %', session_count;
  ELSE
    RAISE NOTICE '❌ user_sessions table missing';
  END IF;
  
  -- Check UUID extension
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'uuid-ossp') THEN
    RAISE NOTICE '✅ uuid-ossp extension installed';
  ELSE
    RAISE NOTICE '❌ uuid-ossp extension missing - run: CREATE EXTENSION "uuid-ossp";';
  END IF;
  
  RAISE NOTICE '';
  RAISE NOTICE '=== COLUMN INFORMATION ===';
END $$;

-- Show table column information using standard SQL
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name IN ('user_profiles', 'user_progress', 'user_sessions')
  AND table_schema = 'public'
ORDER BY table_name, ordinal_position;

-- Show constraints
SELECT 
  tc.table_name,
  tc.constraint_name,
  tc.constraint_type,
  kcu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
  ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_name IN ('user_profiles', 'user_progress', 'user_sessions')
  AND tc.table_schema = 'public'
ORDER BY tc.table_name, tc.constraint_type;
