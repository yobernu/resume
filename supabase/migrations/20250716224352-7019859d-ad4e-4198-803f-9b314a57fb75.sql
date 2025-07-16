-- Create projects table for portfolio
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  github_url TEXT,
  live_url TEXT,
  category TEXT NOT NULL DEFAULT 'Web',
  likes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project likes table to track user likes
CREATE TABLE public.project_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_ip TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(project_id, user_ip)
);

-- Create experiences table for work history
CREATE TABLE public.experiences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  duration TEXT NOT NULL,
  description TEXT NOT NULL,
  achievements TEXT[] NOT NULL DEFAULT '{}',
  technologies TEXT[] NOT NULL DEFAULT '{}',
  type TEXT NOT NULL DEFAULT 'work', -- 'work' or 'project'
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  display_order INTEGER NOT NULL DEFAULT 0
);

-- Create education table
CREATE TABLE public.education (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  duration TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  display_order INTEGER NOT NULL DEFAULT 0
);

-- Create certifications table
CREATE TABLE public.certifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  display_order INTEGER NOT NULL DEFAULT 0
);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  display_order INTEGER NOT NULL DEFAULT 0
);

-- Create contact submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (portfolio is public)
CREATE POLICY "Anyone can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Anyone can view experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Anyone can view education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Anyone can view certifications" ON public.certifications FOR SELECT USING (true);
CREATE POLICY "Anyone can view achievements" ON public.achievements FOR SELECT USING (true);

-- Create policies for project likes (allow anyone to like)
CREATE POLICY "Anyone can view project likes" ON public.project_likes FOR SELECT USING (true);
CREATE POLICY "Anyone can insert project likes" ON public.project_likes FOR INSERT WITH CHECK (true);

-- Create policy for contact submissions (allow anyone to submit)
CREATE POLICY "Anyone can submit contact forms" ON public.contact_submissions FOR INSERT WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.projects (title, description, image, tags, github_url, live_url, category) VALUES
('E-Commerce Platform', 'A full-stack e-commerce platform built with React and Node.js, featuring user authentication, payment integration, and admin dashboard.', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80', ARRAY['React', 'Node.js', 'MongoDB', 'Stripe'], 'https://github.com/yourusername/ecommerce', 'https://ecommerce-demo.com', 'Web'),
('Task Management Mobile App', 'A cross-platform mobile app built with Flutter for task management and team collaboration with real-time synchronization.', 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80', ARRAY['Flutter', 'Firebase', 'Dart'], 'https://github.com/yourusername/taskapp', 'https://play.google.com/store', 'Mobile'),
('Data Analytics Dashboard', 'Python-based analytics dashboard using Django and Chart.js for visualizing business metrics and KPIs.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', ARRAY['Python', 'Django', 'Chart.js', 'PostgreSQL'], 'https://github.com/yourusername/analytics', 'https://analytics-demo.com', 'Web'),
('Weather Forecast App', 'React Native weather application with location-based forecasts, interactive maps, and push notifications.', 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=800&q=80', ARRAY['React Native', 'Expo', 'API Integration'], 'https://github.com/yourusername/weather', 'https://expo.dev/@username/weather', 'Mobile'),
('Algorithm Visualizer', 'Interactive web application for visualizing sorting and searching algorithms built with React and TypeScript.', 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=800&q=80', ARRAY['React', 'TypeScript', 'Algorithms', 'D3.js'], 'https://github.com/yourusername/algo-viz', 'https://algo-visualizer.com', 'Web'),
('Blockchain Voting System', 'Decentralized voting application using Web3 technologies and smart contracts for secure and transparent elections.', 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80', ARRAY['Solidity', 'Web3.js', 'React', 'Ethereum'], 'https://github.com/yourusername/voting', 'https://voting-dapp.com', 'Blockchain');

INSERT INTO public.experiences (title, company, duration, description, achievements, technologies, type, display_order) VALUES
('Senior Flutter Developer', 'TechCorp Solutions', '2023 - Present', 'Leading mobile app development team, architecting scalable Flutter applications for enterprise clients.', ARRAY['Led team of 5 developers', 'Increased app performance by 40%', 'Implemented CI/CD pipeline'], ARRAY['Flutter', 'Dart', 'Firebase', 'AWS'], 'work', 1),
('React Native Developer', 'StartupXYZ', '2022 - 2023', 'Developed cross-platform mobile applications using React Native and Expo for various startup clients.', ARRAY['Built 8+ mobile apps', 'Reduced development time by 30%', 'Integrated 15+ third-party APIs'], ARRAY['React Native', 'Expo', 'TypeScript', 'Redux'], 'work', 2),
('Full Stack Developer', 'WebDev Agency', '2021 - 2022', 'Developed modern web applications using React, Node.js, and Python for diverse client portfolio.', ARRAY['Delivered 12+ web projects', 'Improved site speed by 50%', 'Mentored junior developers'], ARRAY['React', 'Node.js', 'Python', 'PostgreSQL'], 'work', 3);

INSERT INTO public.experiences (title, company, duration, description, achievements, technologies, type, link, display_order) VALUES
('LeetCode Problem Solver', 'Personal Project', '2020 - Present', 'Consistently solving algorithmic problems on LeetCode to improve problem-solving skills and data structure knowledge.', ARRAY['Solved 500+ problems', 'Top 15% global ranking', 'Expert in Dynamic Programming'], ARRAY['Python', 'Java', 'Algorithms', 'Data Structures'], 'project', 'https://leetcode.com/yourusername', 4),
('Codeforces Competitor', 'Competitive Programming', '2019 - Present', 'Active participant in competitive programming contests, specializing in algorithmic problem solving.', ARRAY['Rating: 1400+ (Specialist)', 'Participated in 50+ contests', 'Regional ICPC qualifier'], ARRAY['C++', 'Algorithms', 'Mathematics'], 'project', 'https://codeforces.com/profile/yourusername', 5),
('Open Source Contributor', 'Various Projects', '2020 - Present', 'Contributing to open source Flutter and React projects, helping maintain popular packages and libraries.', ARRAY['10+ merged PRs', '500+ stars on personal projects', 'Maintainer of 3 packages'], ARRAY['Flutter', 'React', 'Open Source'], 'project', 'https://github.com/yourusername', 6);

INSERT INTO public.education (degree, institution, duration, description, display_order) VALUES
('Bachelor of Computer Science', 'University of Technology', '2018 - 2022', 'Specialized in Software Engineering and Data Structures. Graduated with honors.', 1),
('Full Stack Web Development Certification', 'FreeCodeCamp', '2021', 'Comprehensive certification covering modern web development technologies and best practices.', 2);

INSERT INTO public.certifications (name, issuer, date, description, display_order) VALUES
('Google Flutter Development', 'Google', '2023', 'Advanced Flutter development certification covering state management, testing, and deployment.', 1),
('AWS Solutions Architect', 'Amazon Web Services', '2022', 'Cloud architecture and services certification for scalable application deployment.', 2),
('React Native Specialist', 'Meta', '2022', 'Comprehensive certification in React Native development and mobile app architecture.', 3);

INSERT INTO public.achievements (title, description, date, display_order) VALUES
('Hackathon Winner', 'Won first place in TechCrunch Disrupt hackathon with innovative AI-powered mobile app', '2023', 1),
('Top Contributor Award', 'Recognized as top contributor in company-wide innovation challenge', '2022', 2),
('Published Research Paper', 'Co-authored paper on mobile app performance optimization published in IEEE conference', '2021', 3);