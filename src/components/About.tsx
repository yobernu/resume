import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Smartphone, Database, Brain } from "lucide-react";

const About = () => {
  const skills = {
    "Frontend": {
      icon: <Code className="w-5 h-5" />,
      items: ["React", "Flutter", "TypeScript", "Tailwind CSS", "Next.js", "Vite"]
    },
    "Mobile": {
      icon: <Smartphone className="w-5 h-5" />,
      items: ["React Native", "Expo", "Flutter", "iOS", "Android"]
    },
    "Backend": {
      icon: <Database className="w-5 h-5" />,
      items: ["Python", "Node.js", "FastAPI", "Django", "PostgreSQL", "MongoDB"]
    },
    "DSA & Tools": {
      icon: <Brain className="w-5 h-5" />,
      items: ["Data Structures", "Algorithms", "LeetCode", "CodeForces", "Git", "Docker"]
    }
  };

  return (
    <section id="about" className="py-20 bg-background">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm a passionate developer who loves to create innovative solutions and solve complex problems.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Info */}
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                With expertise spanning multiple technologies, I specialize in building 
                <span className="text-primary font-semibold"> full-stack web applications</span> and 
                <span className="text-secondary font-semibold"> cross-platform mobile apps</span>. 
                My journey in software development has led me to master both frontend and backend technologies.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                I'm particularly passionate about <span className="text-accent font-semibold">competitive programming</span> 
                and enjoy solving algorithmic challenges on platforms like LeetCode and CodeForces. 
                This has strengthened my problem-solving skills and helped me write more efficient code.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                When I'm not coding, I love exploring new technologies, contributing to open-source projects, 
                and sharing knowledge with the developer community.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">500+</div>
                <div className="text-sm text-muted-foreground">Problems Solved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">2+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid gap-6">
            {Object.entries(skills).map(([category, data]) => (
              <Card key={category} className="p-6 card-hover bg-gradient-card border-primary/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {data.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.items.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className="bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;