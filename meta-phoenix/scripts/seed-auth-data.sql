-- Insert sample user profiles
INSERT INTO user_profiles (email, full_name, company, role) VALUES
('john.doe@example.com', 'John Doe', 'TechCorp', 'Security Analyst'),
('jane.smith@example.com', 'Jane Smith', 'CyberSafe Inc', 'CISO'),
('alex.johnson@example.com', 'Alex Johnson', 'SecureNet', 'Penetration Tester'),
('demo@metaphoenix.co.sz', 'Demo User', 'Meta-Phoenix', 'Security Researcher')
ON CONFLICT (email) DO NOTHING;

-- Insert user progress data
INSERT INTO user_progress (user_id, total_xp, level, completed_challenges, badges) 
SELECT 
  up.id,
  CASE 
    WHEN up.email = 'john.doe@example.com' THEN 1250
    WHEN up.email = 'jane.smith@example.com' THEN 2100
    WHEN up.email = 'alex.johnson@example.com' THEN 850
    WHEN up.email = 'demo@metaphoenix.co.sz' THEN 1500
    ELSE 0
  END,
  CASE 
    WHEN up.email = 'john.doe@example.com' THEN 3
    WHEN up.email = 'jane.smith@example.com' THEN 5
    WHEN up.email = 'alex.johnson@example.com' THEN 2
    WHEN up.email = 'demo@metaphoenix.co.sz' THEN 4
    ELSE 1
  END,
  ARRAY[]::TEXT[],
  CASE 
    WHEN up.email = 'john.doe@example.com' THEN ARRAY['Network Security Expert', 'Threat Hunter']
    WHEN up.email = 'jane.smith@example.com' THEN ARRAY['Security Leader', 'Compliance Expert', 'Risk Manager']
    WHEN up.email = 'alex.johnson@example.com' THEN ARRAY['Penetration Tester']
    WHEN up.email = 'demo@metaphoenix.co.sz' THEN ARRAY['Research Contributor', 'AI Security Expert']
    ELSE ARRAY[]::TEXT[]
  END
FROM user_profiles up
ON CONFLICT (user_id) DO UPDATE SET
  total_xp = EXCLUDED.total_xp,
  level = EXCLUDED.level,
  badges = EXCLUDED.badges,
  updated_at = NOW();

-- Insert detailed research papers (only if research_projects exist)
INSERT INTO research_papers (project_id, title, abstract, methodology, results, conclusions, keywords, pdf_url) 
SELECT 
  rp.id,
  rp.title,
  'This research presents a comprehensive analysis of ' || rp.title || '. Our study addresses critical challenges in cybersecurity through innovative approaches and methodologies. We explore the intersection of artificial intelligence, machine learning, and cybersecurity to develop novel solutions for emerging threats in the digital landscape.',
  'We employed a mixed-methods approach combining quantitative analysis, experimental validation, and real-world case studies to evaluate the effectiveness of our proposed solutions. Our methodology included controlled laboratory experiments, field testing in enterprise environments, and statistical analysis of large-scale datasets to ensure robust and reliable results.',
  'Our findings demonstrate significant improvements in threat detection accuracy, with a 95% success rate in identifying previously unknown attack vectors. The proposed system showed a 40% reduction in false positives compared to existing solutions, while maintaining real-time performance requirements. Additionally, we observed improved scalability across different network architectures and deployment scenarios.',
  'The research contributes to the advancement of cybersecurity by providing practical solutions that can be implemented in real-world environments. Our work establishes new benchmarks for threat detection systems and provides a foundation for future research in AI-driven cybersecurity. The findings have immediate applications in enterprise security operations and contribute to the broader understanding of automated threat response systems.',
  rp.tags,
  '/papers/' || LOWER(REPLACE(REPLACE(rp.title, ' ', '-'), '''', '')) || '.pdf'
FROM research_projects rp
WHERE rp.active = true
ON CONFLICT DO NOTHING;

-- Verify data insertion
DO $$
BEGIN
  RAISE NOTICE 'User profiles created: %', (SELECT COUNT(*) FROM user_profiles);
  RAISE NOTICE 'User progress records: %', (SELECT COUNT(*) FROM user_progress);
  RAISE NOTICE 'Research papers created: %', (SELECT COUNT(*) FROM research_papers);
END $$;
