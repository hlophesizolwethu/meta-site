-- Complete authentication setup in one script
DO $$
BEGIN
  RAISE NOTICE '🚀 STARTING COMPLETE AUTH SETUP';
  RAISE NOTICE '================================';
END $$;

-- Step 1: Fix any issues
\i scripts/fix-auth-issues.sql

-- Step 2: Seed demo users
\i scripts/seed-demo-users.sql

-- Step 3: Verify everything works
\i scripts/verify-auth-setup.sql

DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '🎉 COMPLETE AUTH SETUP FINISHED!';
  RAISE NOTICE '=================================';
  RAISE NOTICE '';
  RAISE NOTICE '✅ Ready to test authentication';
  RAISE NOTICE '✅ Demo account available';
  RAISE NOTICE '✅ All tables and constraints created';
  RAISE NOTICE '';
  RAISE NOTICE '🔗 Next steps:';
  RAISE NOTICE '   1. Test login with demo@metaphoenix.co.sz';
  RAISE NOTICE '   2. Check user progress tracking';
  RAISE NOTICE '   3. Verify XP and badge system';
END $$;
