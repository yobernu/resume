import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ExternalLink, Github, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import CommentsModal from "@/components/ui/CommentsModal";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github_url?: string;
  live_url?: string;
  likes: number;
  finished: boolean;
  category: string;
}

const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const [likedProjects, setLikedProjects] = useState<Set<string>>(new Set());
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to load projects. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", "Web", "Mobile", "Other"];
  
  const filteredProjects = projects.filter(project =>
    (filter === "All" || project.category === filter) && project.finished === true
  );

  const handleLike = async (projectId: string) => {
    try {
      // Get user's IP address for tracking likes (simplified)
      const userIp = 'user-' + Math.random().toString(36).substr(2, 9);
      
      const isLiked = likedProjects.has(projectId);
      
      if (isLiked) {
        // Remove like
        await supabase
          .from('project_likes')
          .delete()
          .eq('project_id', projectId)
          .eq('user_ip', userIp);
        
        // Update project likes count
        const project = projects.find(p => p.id === projectId);
        if (project) {
          await supabase
            .from('projects')
            .update({ likes: Math.max(0, project.likes - 1) })
            .eq('id', projectId);
        }
        
        setLikedProjects(prev => {
          const newSet = new Set(prev);
          newSet.delete(projectId);
          return newSet;
        });
      } else {
        // Add like
        await supabase
          .from('project_likes')
          .insert({ project_id: projectId, user_ip: userIp });
        
        // Update project likes count
        const project = projects.find(p => p.id === projectId);
        if (project) {
          await supabase
            .from('projects')
            .update({ likes: project.likes + 1 })
            .eq('id', projectId);
        }
        
        setLikedProjects(prev => new Set([...prev, projectId]));
      }
      
      // Refresh projects to get updated like counts
      fetchProjects();
    } catch (error) {
      console.error('Error handling like:', error);
      toast({
        title: "Error",
        description: "Failed to update like. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <section id="portfolio" className="py-20 bg-muted/30">
        <div className="section-container">
          <div className="text-center">
            <div className="animate-pulse">Loading projects...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 bg-muted/30">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            My <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A collection of projects showcasing my skills across different technologies and platforms.
          </p>
          
          {/* Filter Buttons */}
          <div className="flex justify-center gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "gradient" : "glow"}
                onClick={() => setFilter(category)}
                className="transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden card-hover bg-card border-border/50">
              {/* Project Image */}
              <div className="relative group overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    {project.live_url && (
                      <Button size="sm" variant="gradient" asChild>
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {project.github_url && (
                      <Button size="sm" variant="glow" asChild>
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {project.category}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="text-xs border-primary/20 hover:border-primary transition-colors duration-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {/* Actions */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleLike(project.id)}
                    className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors duration-300"
                  >
                    <Heart 
                      className={`w-4 h-4 ${likedProjects.has(project.id) ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                    <span className="text-sm">
                      {project.likes + (likedProjects.has(project.id) ? 1 : 0)}
                    </span>
                  </button>
                  
                  <Button variant="ghost" size="sm" onClick={() => { setSelectedProjectId(project.id); setCommentsOpen(true); }}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Comments
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      {selectedProjectId && (
        <CommentsModal
          open={commentsOpen}
          onClose={() => setCommentsOpen(false)}
          projectId={selectedProjectId}
        />
      )}
    </section>
  );
};

export default Portfolio;