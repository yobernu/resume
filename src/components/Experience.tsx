import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: "Senior Mobile Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      duration: "2023 - Present",
      type: "Full-time",
      description: "Led the development of cross-platform mobile applications using Flutter and React Native. Mentored junior developers and implemented CI/CD pipelines.",
      achievements: [
        "Increased app performance by 40% through optimization",
        "Led a team of 5 developers on major product releases",
        "Implemented automated testing reducing bugs by 60%"
      ],
      technologies: ["Flutter", "React Native", "Firebase", "AWS"]
    },
    {
      id: 2,
      title: "Full-Stack Developer",
      company: "StartupXYZ",
      location: "Austin, TX",
      duration: "2022 - 2023",
      type: "Full-time",
      description: "Developed web applications using React and Python. Built scalable backend APIs and managed database architecture.",
      achievements: [
        "Built MVP that gained 10,000+ users in first month",
        "Reduced API response time by 70% through optimization",
        "Collaborated with design team on user experience improvements"
      ],
      technologies: ["React", "Python", "FastAPI", "PostgreSQL"]
    },
    {
      id: 3,
      title: "Mobile Development Intern",
      company: "MobileTech Inc",
      location: "Seattle, WA",
      duration: "Summer 2022",
      type: "Internship",
      description: "Assisted in developing mobile applications and learned industry best practices. Contributed to code reviews and testing processes.",
      achievements: [
        "Developed 3 feature modules for main product",
        "Participated in agile development methodology",
        "Received offer for full-time position"
      ],
      technologies: ["Java", "Kotlin", "Android Studio", "Git"]
    }
  ];

  const projects = [
    {
      id: 1,
      title: "Open Source Contribution",
      organization: "Flutter Community",
      duration: "2023 - Present",
      description: "Active contributor to Flutter packages and documentation. Maintained popular widgets library with 1000+ stars.",
      link: "https://github.com/flutter",
      technologies: ["Flutter", "Dart", "Documentation"]
    },
    {
      id: 2,
      title: "Competitive Programming",
      organization: "LeetCode & CodeForces",
      duration: "2021 - Present",
      description: "Solved 800+ algorithmic problems. Achieved Expert rating on CodeForces and top 5% on LeetCode.",
      link: "https://leetcode.com",
      technologies: ["Python", "C++", "Algorithms", "Data Structures"]
    },
    {
      id: 3,
      title: "Freelance Projects",
      organization: "Various Clients",
      duration: "2022 - Present",
      description: "Delivered 15+ web and mobile applications for small businesses. Specialized in e-commerce and booking systems.",
      technologies: ["React", "Flutter", "Python", "Firebase"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional experience and personal projects that shaped my development career.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Work Experience */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
              <div className="w-2 h-8 bg-gradient-primary rounded-full"></div>
              Work Experience
            </h3>
            
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card key={exp.id} className="p-6 card-hover bg-gradient-card border-primary/10 relative">
                  {/* Timeline connector */}
                  {index !== experiences.length - 1 && (
                    <div className="absolute left-8 bottom-0 w-0.5 h-6 bg-gradient-primary transform translate-y-full"></div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-foreground">{exp.title}</h4>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <div className="flex flex-col sm:items-end mt-2 sm:mt-0">
                      <Badge variant="secondary" className="mb-2 bg-primary/10 text-primary">
                        {exp.type}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {exp.duration}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{exp.description}</p>
                  
                  <div className="mb-4">
                    <h5 className="font-medium mb-2">Key Achievements:</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="border-primary/20 hover:border-primary transition-colors duration-300">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Projects & Contributions */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
              <div className="w-2 h-8 bg-gradient-secondary rounded-full"></div>
              Projects & Contributions
            </h3>
            
            <div className="space-y-6">
              {projects.map((project, index) => (
                <Card key={project.id} className="p-6 card-hover bg-gradient-card border-primary/10 relative">
                  {/* Timeline connector */}
                  {index !== projects.length - 1 && (
                    <div className="absolute left-8 bottom-0 w-0.5 h-6 bg-gradient-secondary transform translate-y-full"></div>
                  )}
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-foreground">{project.title}</h4>
                      <p className="text-secondary font-medium">{project.organization}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <Calendar className="w-4 h-4" />
                        {project.duration}
                      </div>
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-glow transition-colors duration-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="border-secondary/30 hover:border-secondary transition-colors duration-300">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;