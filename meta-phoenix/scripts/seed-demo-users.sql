-- Seed demo users safely
DO $$
DECLARE
  demo_user_id UUID;
  john_user_id UUID;
  jane_user_id UUID;
  user_count INTEGER;
BEGIN
  RAISE NOTICE '=== SEEDING DEMO USERS ===';
  RAISE NOTICE '';
  
  -- Insert demo user
  BEGIN
    INSERT INTO user_profiles (email, full_name, company, role)
    VALUES ('demo@metaphoenix.co.sz', 'Demo User', 'Meta-Phoenix', 'Security Researcher')
    ON CONFLICT (email) DO NOTHING;
    
    SELECT id INTO demo_user_id FROM user_profiles WHERE email = 'demo@metaphoenix.co.sz';
    RAISE NOTICE '✅ Demo user ready: %', demo_user_id;
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '❌ Failed to create demo user: %', SQLERRM;
  END;
  
  -- Insert John Doe
  BEGIN
    INSERT INTO user_profiles (email, full_name, company, role)
    VALUES ('john.doe@example.com', 'John Doe', 'TechCorp', 'Security Analyst')
    ON CONFLICT (email) DO NOTHING;
    
    SELECT id INTO john_user_id FROM user_profiles WHERE email = 'john.doe@example.com';
    RAISE NOTICE '✅ John Doe ready: %', john_user_id;
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '❌ Failed to create John Doe: %', SQLERRM;
  END;
  
  -- Insert Jane Smith
  BEGIN
    INSERT INTO user_profiles (email, full_name, company, role)
    VALUES ('jane.smith@example.com', 'Jane Smith', 'CyberSafe Inc', 'CISO')
    ON CONFLICT (email) DO NOTHING;
    
    SELECT id INTO jane_user_id FROM user_profiles WHERE email = 'jane.smith@example.com';
    RAISE NOTICE '✅ Jane Smith ready: %', jane_user_id;
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '❌ Failed to create Jane Smith: %', SQLERRM;
  END;
  
  -- Insert progress for demo user
  IF demo_user_id IS NOT NULL THEN
    BEGIN
      INSERT INTO user_progress (user_id, total_xp, level, badges)
      VALUES (demo_user_id, 1500, 4, ARRAY['Research Contributor', 'AI Security Expert'])
      ON CONFLICT (user_id) DO UPDATE SET
        total_xp = EXCLUDED.total_xp,
        level = EXCLUDED.level,
        badges = EXCLUDED.badges,
        updated_at = NOW();
      RAISE NOTICE '✅ Demo user progress set';
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE '❌ Failed to set demo progress: %', SQLERRM;
    END;
  END IF;
  
  -- Insert progress for John
  IF john_user_id IS NOT NULL THEN
    BEGIN
      INSERT INTO user_progress (user_id, total_xp, level, badges)
      VALUES (john_user_id, 1250, 3, ARRAY['Network Security Expert', 'Threat Hunter'])
      ON CONFLICT (user_id) DO UPDATE SET
        total_xp = EXCLUDED.total_xp,
        level = EXCLUDED.level,
        badges = EXCLUDED.badges,
        updated_at = NOW();
      RAISE NOTICE '✅ John progress set';
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE '❌ Failed to set John progress: %', SQLERRM;
    END;
  END IF;
  
  -- Insert progress for Jane
  IF jane_user_id IS NOT NULL THEN
    BEGIN
      INSERT INTO user_progress (user_id, total_xp, level, badges)
      VALUES (jane_user_id, 2100, 5, ARRAY['Security Leader', 'Compliance Expert'])
      ON CONFLICT (user_id) DO UPDATE SET
        total_xp = EXCLUDED.total_xp,
        level = EXCLUDED.level,
        badges = EXCLUDED.badges,
        updated_at = NOW();
      RAISE NOTICE '✅ Jane progress set';
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE '❌ Failed to set Jane progress: %', SQLERRM;
    END;
  END IF;
  
  SELECT COUNT(*) INTO user_count FROM user_profiles;
  RAISE NOTICE '';
  RAISE NOTICE '🎉 Demo users seeded! Total users: %', user_count;
  RAISE NOTICE '';
  RAISE NOTICE '=== LOGIN CREDENTIALS ===';
  RAISE NOTICE 'Demo Account:';
  RAISE NOTICE '  📧 Email: demo@metaphoenix.co.sz';
  RAISE NOTICE '  🔑 Password: any password (demo mode)';
  RAISE NOTICE '  🏆 XP: 1500 | Level: 4';
END $$;
