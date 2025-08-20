import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Award, GraduationCap, Calendar, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Stat {
  id: string;
  name: string;
  value: number;
  label: string;
}

const Resume = () => {
  const [education, setEducation] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchResumeData();
    const fetchStats = async () => {
      const { data, error } = await supabase
        .from('stats')
        .select('*')
        .order('name', { ascending: true });
      if (!error && data) setStats(data);
      setLoading(false);
    };
    fetchStats();
  }, []);

  const fetchResumeData = async () => {
    try {
      const [educationResult, certificationsResult, achievementsResult] = await Promise.all([
        supabase.from('education').select('*').order('display_order'),
        supabase.from('certifications').select('*').order('display_order'),
        supabase.from('achievements').select('*').order('display_order')
      ]);

      setEducation(educationResult.data || []);
      setCertifications(certificationsResult.data || []);
      setAchievements(achievementsResult.data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load resume data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };


  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="resume" className="py-20 bg-muted/30">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            My <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive overview of my education, certifications, and achievements.
          </p>
          
          <Button 
            variant="gradient" 
            size="lg" 
            onClick={handleDownloadResume}
            className="font-semibold"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Resume PDF
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              {education.length > 0 ? "Education" : "No Education"}
            </h3>
            
            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card key={index} className="p-6 card-hover bg-gradient-card border-primary/10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">{edu.degree}</h4>
                      <p className="text-primary font-medium">{edu.institution}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{edu.duration}</p>
                    </div>
                  </div>
                  
                  {edu.description && (
                    <p className="text-muted-foreground text-sm">{edu.description}</p>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Award className="w-6 h-6 text-secondary" />
              </div>
              {certifications.length > 0 ? "Certifications" : "soon"}
            </h3>
            
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <Card key={index} className="p-4 card-hover bg-gradient-card border-primary/10">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{cert.name}</h4>
                      <p className="text-secondary text-sm">{cert.issuer}</p>
                    </div>
                    <span className="text-sm font-medium text-accent">{cert.date}</span>
                  </div>
                  {cert.description && (
                    <p className="text-xs text-muted-foreground">{cert.description}</p>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <FileText className="w-6 h-6 text-accent" />
            </div>
            {achievements.length > 0 ? "Key Achievements" : "soon"}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="p-6 card-hover bg-gradient-card border-primary/10">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                  <span className="text-sm text-accent font-medium">{achievement.date}</span>
                </div>
                <p className="text-muted-foreground text-sm">{achievement.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-card border-primary/10">
            <h3 className="text-2xl font-semibold mb-6">Technical Skills Summary</h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              {loading ? (
                <div className="col-span-4">Loading stats...</div>
              ) : (
                stats.map((stat) => (
                  <div key={stat.id}>
                    <div className="text-3xl font-bold gradient-text mb-2">
                      {stat.value}+
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Resume;