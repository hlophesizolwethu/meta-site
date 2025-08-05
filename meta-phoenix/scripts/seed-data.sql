-- Insert company information
INSERT INTO company_info (
  name, 
  tagline, 
  description, 
  hero_title, 
  hero_subtitle, 
  mission, 
  vision, 
  values,
  address,
  phone,
  email,
  business_hours
) VALUES (
  'Meta Phoenix Tech',
  'Innovating Technology Solutions in Eswatini',
  'We are a forward-thinking technology company based in Eswatini, dedicated to providing cutting-edge software solutions that transform businesses and communities. Our team of experienced developers and designers work collaboratively to deliver innovative digital solutions.',
  'Innovating Technology Solutions in Eswatini',
  'Empowering businesses with cutting-edge software development, mobile apps, and digital transformation services.',
  'To empower businesses in Eswatini with innovative technology solutions that drive growth and efficiency.',
  'To be the leading technology partner in Eswatini, fostering digital transformation across all industries.',
  ARRAY['Innovation', 'Quality', 'Integrity', 'Customer Focus', 'Collaboration', 'Excellence'],
  'Mbabane, Eswatini',
  '+268 XX XXX XXXX',
  'info@metaphoenixtech.co.sz',
  'Mon - Fri: 8:00 AM - 5:00 PM'
) ON CONFLICT DO NOTHING;

-- Insert services
INSERT INTO services (title, description, features, icon, price_range, order_index) VALUES
(
  'Custom Software Development',
  'Tailored software solutions designed to meet your specific business requirements and workflows.',
  ARRAY['Custom Applications', 'API Development', 'Database Design', 'System Integration', 'Cloud Solutions'],
  '💻',
  '$5,000 - $50,000',
  1
),
(
  'Mobile App Development',
  'Native and cross-platform mobile applications for iOS and Android devices.',
  ARRAY['iOS Development', 'Android Development', 'React Native', 'Flutter', 'App Store Deployment'],
  '📱',
  '$3,000 - $25,000',
  2
),
(
  'Web Development',
  'Modern, responsive websites and web applications built with the latest technologies.',
  ARRAY['Responsive Design', 'E-commerce', 'CMS Development', 'Progressive Web Apps', 'SEO Optimization'],
  '🌐',
  '$2,000 - $15,000',
  3
),
(
  'Digital Transformation',
  'Comprehensive digital strategy and implementation to modernize your business processes.',
  ARRAY['Process Automation', 'Digital Strategy', 'Cloud Migration', 'Data Analytics', 'Training & Support'],
  '🚀',
  '$10,000 - $100,000',
  4
),
(
  'UI/UX Design',
  'User-centered design solutions that create engaging and intuitive digital experiences.',
  ARRAY['User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'Usability Testing'],
  '🎨',
  '$1,500 - $8,000',
  5
),
(
  'Technical Consulting',
  'Expert guidance on technology strategy, architecture, and best practices for your projects.',
  ARRAY['Technology Assessment', 'Architecture Planning', 'Code Review', 'Performance Optimization', 'Security Audit'],
  '🔧',
  '$150 - $300/hour',
  6
) ON CONFLICT DO NOTHING;

-- Insert team members (placeholder data - replace with actual team info)
INSERT INTO team_members (name, position, bio, skills, order_index) VALUES
(
  'John Dlamini',
  'Chief Technology Officer',
  'Experienced software architect with over 10 years in the industry, specializing in scalable web applications and cloud solutions.',
  ARRAY['JavaScript', 'Python', 'AWS', 'React', 'Node.js', 'System Architecture'],
  1
),
(
  'Sarah Nkambule',
  'Lead Frontend Developer',
  'Creative frontend developer passionate about creating beautiful and functional user interfaces with modern web technologies.',
  ARRAY['React', 'TypeScript', 'CSS', 'UI/UX Design', 'Next.js', 'Tailwind CSS'],
  2
),
(
  'Michael Simelane',
  'Backend Developer',
  'Backend specialist focused on building robust APIs and database systems that power modern applications.',
  ARRAY['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Docker', 'Microservices'],
  3
),
(
  'Grace Mthembu',
  'Mobile App Developer',
  'Mobile development expert creating native and cross-platform applications for iOS and Android.',
  ARRAY['React Native', 'Flutter', 'iOS', 'Android', 'Firebase', 'App Store Optimization'],
  4
) ON CONFLICT DO NOTHING;
