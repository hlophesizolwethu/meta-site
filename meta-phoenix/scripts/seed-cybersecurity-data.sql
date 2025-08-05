-- Update company information for cybersecurity focus
UPDATE company_info SET
  name = 'Meta-Phoenix',
  tagline = 'Securing the Digital Frontier',
  description = 'Meta-Phoenix is at the forefront of cybersecurity innovation, combining advanced research with practical security solutions. Our team of world-class researchers and security experts work tirelessly to stay ahead of emerging threats and protect organizations worldwide.',
  hero_title = 'Securing the Digital Frontier',
  hero_subtitle = 'Meta-Phoenix delivers cutting-edge cybersecurity solutions and pioneering research to protect your digital assets from evolving threats.',
  mission = 'To advance cybersecurity through innovative research and provide cutting-edge protection solutions for the digital age.',
  vision = 'To be the global leader in cybersecurity research and education, creating a safer digital world for everyone.',
  values = ARRAY['Innovation', 'Security First', 'Research Excellence', 'Global Protection', 'Continuous Learning'],
  security_certifications = ARRAY['ISO 27001', 'SOC 2 Type II', 'CISSP', 'CISM', 'CEH'],
  research_areas = ARRAY['AI Security', 'Quantum Cryptography', 'IoT Security', 'Threat Intelligence', 'Behavioral Analysis'],
  email = 'security@metaphoenix.co.sz',
  business_hours = '24/7 Security Operations Center'
WHERE id = (SELECT id FROM company_info LIMIT 1);

-- Insert security services
INSERT INTO security_services (title, description, features, icon_type, threat_level, price_range, order_index) VALUES
(
  'Threat Detection',
  'Advanced AI-powered threat detection and response systems to identify and neutralize security threats in real-time.',
  ARRAY['Real-time Monitoring', 'AI Analysis', 'Automated Response', 'Threat Intelligence', 'Behavioral Analytics'],
  'threat',
  'Critical',
  'Contact for Pricing',
  1
),
(
  'Network Security',
  'Comprehensive network protection solutions including firewalls, intrusion detection, and secure network architecture.',
  ARRAY['Firewall Management', 'IDS/IPS', 'VPN Solutions', 'Network Segmentation', 'Zero Trust Architecture'],
  'network',
  'High',
  'Contact for Pricing',
  2
),
(
  'Data Protection',
  'End-to-end data encryption, backup solutions, and compliance management to safeguard your sensitive information.',
  ARRAY['Data Encryption', 'Backup & Recovery', 'Compliance Management', 'Access Control', 'Data Loss Prevention'],
  'data',
  'Critical',
  'Contact for Pricing',
  3
),
(
  'Security Assessment',
  'Comprehensive security audits and penetration testing to identify vulnerabilities in your systems.',
  ARRAY['Vulnerability Assessment', 'Penetration Testing', 'Security Audits', 'Compliance Testing', 'Risk Analysis'],
  'shield',
  'High',
  '$5,000 - $50,000',
  4
),
(
  'Incident Response',
  '24/7 incident response services to quickly contain and remediate security breaches.',
  ARRAY['24/7 Response', 'Forensic Analysis', 'Breach Containment', 'Recovery Planning', 'Legal Support'],
  'alert',
  'Critical',
  'Contact for Pricing',
  5
),
(
  'Security Training',
  'Comprehensive cybersecurity training programs to educate your team on the latest threats and best practices.',
  ARRAY['Security Awareness', 'Phishing Simulation', 'Compliance Training', 'Technical Training', 'Certification Prep'],
  'lock',
  'Medium',
  '$1,000 - $10,000',
  6
) ON CONFLICT DO NOTHING;

-- Insert research projects
INSERT INTO research_projects (title, description, status, publication_date, researchers, tags, featured, order_index) VALUES
(
  'AI-Driven Malware Detection in IoT Devices',
  'Developing machine learning algorithms to identify and prevent malware attacks on Internet of Things devices in real-time.',
  'Published',
  '2024-01-15',
  ARRAY['Dr. Sarah Chen', 'Prof. Michael Johnson', 'Dr. Alex Kim'],
  ARRAY['AI', 'IoT Security', 'Malware Detection', 'Machine Learning'],
  true,
  1
),
(
  'Quantum-Resistant Cryptography Implementation',
  'Research into post-quantum cryptographic methods to secure communications against future quantum computing threats.',
  'In Progress',
  '2024-03-20',
  ARRAY['Dr. Alex Rodriguez', 'Dr. Emily Watson', 'Prof. David Liu'],
  ARRAY['Quantum Computing', 'Cryptography', 'Future Security', 'Post-Quantum'],
  true,
  2
),
(
  'Behavioral Analysis for Insider Threat Detection',
  'Using behavioral analytics and machine learning to identify potential insider threats within organizational networks.',
  'Under Review',
  '2024-02-10',
  ARRAY['Prof. David Kim', 'Dr. Lisa Thompson', 'Dr. Mark Wilson'],
  ARRAY['Behavioral Analysis', 'Insider Threats', 'Machine Learning', 'User Analytics'],
  true,
  3
),
(
  'Zero Trust Architecture in Cloud Environments',
  'Implementing and evaluating zero trust security models for hybrid and multi-cloud infrastructures.',
  'Published',
  '2023-11-30',
  ARRAY['Dr. Jennifer Lee', 'Prof. Robert Chen', 'Dr. Amanda Foster'],
  ARRAY['Zero Trust', 'Cloud Security', 'Architecture', 'Identity Management'],
  false,
  4
),
(
  'Advanced Persistent Threat Attribution',
  'Developing techniques for accurately attributing advanced persistent threats to specific threat actors.',
  'In Progress',
  '2024-04-15',
  ARRAY['Dr. Thomas Anderson', 'Dr. Maria Garcia', 'Prof. James Wright'],
  ARRAY['APT', 'Threat Attribution', 'Forensics', 'Threat Intelligence'],
  false,
  5
) ON CONFLICT DO NOTHING;

-- Insert security challenges for gamification
INSERT INTO security_challenges (title, description, difficulty_level, xp_reward, category, challenge_type, order_index) VALUES
(
  'Network Intrusion Detection',
  'Analyze network traffic logs to identify potential intrusion attempts and malicious activities.',
  'Intermediate',
  250,
  'Network Security',
  'Lab',
  1
),
(
  'Malware Analysis Challenge',
  'Reverse engineer a suspicious executable to understand its behavior and create detection signatures.',
  'Advanced',
  500,
  'Malware Analysis',
  'CTF',
  2
),
(
  'Cryptography Puzzle',
  'Decrypt encrypted messages using various cryptographic techniques and identify vulnerabilities.',
  'Expert',
  750,
  'Cryptography',
  'CTF',
  3
),
(
  'Phishing Email Detection',
  'Identify phishing attempts in a collection of emails and explain the indicators of compromise.',
  'Beginner',
  100,
  'Social Engineering',
  'Quiz',
  4
),
(
  'Incident Response Simulation',
  'Lead an incident response team through a simulated security breach scenario.',
  'Advanced',
  600,
  'Incident Response',
  'Simulation',
  5
) ON CONFLICT DO NOTHING;
