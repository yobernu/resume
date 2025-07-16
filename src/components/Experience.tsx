import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
  type: string;
  link?: string;
  display_order: number;
}

const Experience = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setExperiences(data || []);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      toast({
        title: "Error",
        description: "Failed to load experiences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const workExperiences = experiences.filter(exp => exp.type === 'work');
  const projects = experiences.filter(exp => exp.type === 'project');

  if (loading) {
    return (
      <section id="experience" className="py-20 bg-background">
        <div className="section-container">
          <div className="text-center">
            <div className="animate-pulse">Loading experiences...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive overview of my professional experience and personal projects that showcase my growth as a developer.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Work Experience */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
              💼 Professional Experience
            </h3>
            <div className="space-y-6">
              {workExperiences.map((experience, index) => (
                <Card key={experience.id} className="p-6 card-hover bg-card border-border/50 relative">
                  {/* Timeline connector */}
                  {index < workExperiences.length - 1 && (
                    <div className="absolute left-6 bottom-0 w-0.5 h-6 bg-gradient-to-b from-primary to-transparent transform translate-y-full"></div>
                  )}
                  
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-lg font-semibold text-foreground">{experience.title}</h4>
                          <p className="text-primary font-medium">{experience.company}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {experience.duration}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-3">
                        {experience.description}
                      </p>
                      
                      {experience.achievements.length > 0 && (
                        <div className="mb-3">
                          <h5 className="text-sm font-medium mb-2">Key Achievements:</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {experience.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="secondary" 
                            className="text-xs bg-primary/10 text-primary"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Personal Projects */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
              🚀 Personal Projects
            </h3>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <Card key={project.id} className="p-6 card-hover bg-card border-border/50 relative">
                  {/* Timeline connector */}
                  {index < projects.length - 1 && (
                    <div className="absolute left-6 bottom-0 w-0.5 h-6 bg-gradient-to-b from-primary to-transparent transform translate-y-full"></div>
                  )}
                  
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-semibold text-foreground">{project.title}</h4>
                          {project.link && (
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {project.duration}
                        </Badge>
                      </div>
                      
                      <p className="text-primary font-medium mb-2">{project.company}</p>
                      
                      <p className="text-muted-foreground mb-3">
                        {project.description}
                      </p>
                      
                      {project.achievements.length > 0 && (
                        <div className="mb-3">
                          <h5 className="text-sm font-medium mb-2">Achievements:</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {project.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="secondary" 
                            className="text-xs bg-primary/10 text-primary"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
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