-- Verify the authentication setup
DO $$
DECLARE
  user_count INTEGER;
  progress_count INTEGER;
  session_count INTEGER;
  demo_user_record RECORD;
BEGIN
  -- Count records
  SELECT COUNT(*) INTO user_count FROM user_profiles;
  SELECT COUNT(*) INTO progress_count FROM user_progress;
  SELECT COUNT(*) INTO session_count FROM user_sessions;
  
  -- Get demo user info
  SELECT up.email, up.full_name, pr.total_xp, pr.level, array_length(pr.badges, 1) as badge_count
  INTO demo_user_record
  FROM user_profiles up
  LEFT JOIN user_progress pr ON up.id = pr.user_id
  WHERE up.email = 'demo@metaphoenix.co.sz';
  
  RAISE NOTICE '=== AUTH SETUP VERIFICATION ===';
  RAISE NOTICE 'User profiles: %', user_count;
  RAISE NOTICE 'User progress records: %', progress_count;
  RAISE NOTICE 'Active sessions: %', session_count;
  RAISE NOTICE '';
  
  IF demo_user_record.email IS NOT NULL THEN
    RAISE NOTICE 'Demo User Details:';
    RAISE NOTICE '  Email: %', demo_user_record.email;
    RAISE NOTICE '  Name: %', demo_user_record.full_name;
    RAISE NOTICE '  XP: %', COALESCE(demo_user_record.total_xp, 0);
    RAISE NOTICE '  Level: %', COALESCE(demo_user_record.level, 1);
    RAISE NOTICE '  Badges: %', COALESCE(demo_user_record.badge_count, 0);
  ELSE
    RAISE NOTICE 'Demo user not found!';
  END IF;
  
  RAISE NOTICE '';
  RAISE NOTICE '=== READY FOR TESTING ===';
  RAISE NOTICE 'You can now test login with:';
  RAISE NOTICE '  Email: demo@metaphoenix.co.sz';
  RAISE NOTICE '  Password: any password (demo mode)';
END $$;

-- Show all users for reference
SELECT 
  up.email,
  up.full_name,
  up.company,
  up.role,
  COALESCE(pr.total_xp, 0) as xp,
  COALESCE(pr.level, 1) as level,
  COALESCE(array_length(pr.badges, 1), 0) as badge_count
FROM user_profiles up
LEFT JOIN user_progress pr ON up.id = pr.user_id
ORDER BY up.created_at;
