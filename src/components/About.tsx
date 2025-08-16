import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Smartphone, Database, Brain } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const iconMap: { [key: string]: React.ComponentType<any> } = {
  Code,
  Smartphone,
  Database,
  Brain
};

const About = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectCount, setProjectCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('have_skill', true)
        .order('category', { ascending: true })
        .order('display_order', { ascending: true });
      if (!error && data) setSkills(data);
      setLoading(false);
    };
    fetchSkills();

    // Fetch project count
    const fetchProjectCount = async () => {
      const { count, error } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true });
      if (!error && typeof count === 'number') setProjectCount(count);
    };
    fetchProjectCount();
  }, []);

  // Group skills by category
  const grouped: Record<string, any[]> = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, any[]>);

  // Icon for each category
  const categoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend': return <Code className="w-5 h-5" />;
      case 'Mobile': return <Smartphone className="w-5 h-5" />;
      case 'Backend': return <Database className="w-5 h-5" />;
      case 'DSA & Tools': return <Brain className="w-5 h-5" />;
      default: return <Code className="w-5 h-5" />;
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
                With a strong focus on product UI/UX, I specialize in building
                <span className="text-primary font-semibold"> front-end web applications</span> and
                <span className="text-secondary font-semibold"> cross-platform mobile apps </span>
                using <span className="text-primary font-bold">Flutter</span> as well as <span className="text-secondary font-semi-bold">React native stacks.</span> I follow
                <span className="text-primary font-bold"> Clean Architecture</span> to keep code modular, testable, and scalable.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                I'm particularly passionate about <span className="text-secondary font-semibold">competitive programming </span>
                and enjoy solving algorithmic challenges on platforms like <span className="text-secondary font-semibold">LeetCode</span> and <span className="text-secondary font-semibold">CodeForces</span>.
                This constant practice sharpens my problem-solving, algorithmic thinking, and code efficiency—directly
                improving the performance and reliability of the apps I build.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                When I'm not coding, I love exploring new technologies, contributing to open-source projects, 
                and sharing knowledge with the developer community.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  +{projectCount !== null ? projectCount : '...'}
                </div>
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
            {loading ? (
              <div>Loading skills...</div>
            ) : (
              Object.entries(grouped).map(([category, items]) => (
                <Card key={category} className="p-6 card-hover bg-gradient-card border-primary/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {categoryIcon(category)}
                    </div>
                    <h3 className="text-lg font-semibold">{category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill: any) => (
                      <Badge 
                        key={skill.id} 
                        variant="secondary" 
                        className="bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;