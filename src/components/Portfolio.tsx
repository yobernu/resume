import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ExternalLink, Github, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import CommentsModal from "@/components/ui/CommentsModal";
import ProjectDetails from "@/components/ProjectDetails";

interface Project {
  id: string;
  title: string;
  description: string;
  large_description?: string;
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
  const [showAll, setShowAll] = useState(false);
  const [projectDetailsOpen, setProjectDetailsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Get or create persistent user ID
  const getUserId = () => {
    let userId = localStorage.getItem('portfolio_user_id');
    if (!userId) {
      userId = 'user-' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('portfolio_user_id', userId);
    }
    return userId;
  };

  useEffect(() => {
    fetchProjects();
    fetchUserLikes();
  }, []);

  const fetchUserLikes = async () => {
    const userId = getUserId();
    try {
      const { data, error } = await supabase
        .from('project_likes')
        .select('project_id')
        .eq('user_ip', userId);
      
      if (!error && data) {
        const likedIds = new Set(data.map(like => like.project_id));
        setLikedProjects(likedIds);
      }
    } catch (error) {
      console.error('Error fetching user likes:', error);
    }
  };

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

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setProjectDetailsOpen(true);
  };

  const closeProjectDetails = () => {
    setProjectDetailsOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const handleLike = async (projectId: string, callback?: (newLiked: boolean) => void) => {
    const userId = getUserId();
    const isLiked = likedProjects.has(projectId);
    
    console.log('handleLike called:', { projectId, isLiked, userId });
    
    try {
      // Get current project state
      const currentProject = projects.find(p => p.id === projectId);
      if (!currentProject) {
        console.error('Project not found:', projectId);
        return;
      }
      
      if (isLiked) {
        // Unlike: Remove from project_likes table
        const { error: deleteError } = await supabase
          .from('project_likes')
          .delete()
          .eq('project_id', projectId)
          .eq('user_ip', userId);
        
        if (deleteError) {
          console.error('Delete like error:', deleteError);
          throw deleteError;
        }
        console.log('Successfully deleted like from project_likes');
        
        // Decrement likes count
        const newLikes = Math.max(0, currentProject.likes - 1);
        
        const { data: updateData, error: updateError } = await supabase
          .from('projects')
          .update({ likes: newLikes })
          .eq('id', projectId)
          .select();
        
        if (updateError) {
          console.error('DB update error (unlike):', updateError);
          throw updateError;
        }
        
        console.log('DB updated (unlike):', { newLikes, updateData });
        
        // Update local state
        setProjects(prev => prev.map(p => 
          p.id === projectId ? { ...p, likes: newLikes } : p
        ));
        
        setLikedProjects(prev => {
          const newSet = new Set(prev);
          newSet.delete(projectId);
          return newSet;
        });
        
        callback?.(false);
      } else {
        // Like: Add to project_likes table
        const { error: insertError } = await supabase
          .from('project_likes')
          .insert({ project_id: projectId, user_ip: userId });
        
        if (insertError) {
          console.error('Insert like error:', insertError);
          throw insertError;
        }
        console.log('Successfully inserted like to project_likes');
        
        // Increment likes count
        const newLikes = currentProject.likes + 1;
        
        const { data: updateData, error: updateError } = await supabase
          .from('projects')
          .update({ likes: newLikes })
          .eq('id', projectId)
          .select();
        
        if (updateError) {
          console.error('DB update error (like):', updateError);
          throw updateError;
        }
        
        console.log('DB updated (like):', { newLikes, updateData });
        
        // Update local state
        setProjects(prev => prev.map(p => 
          p.id === projectId ? { ...p, likes: newLikes } : p
        ));
        
        setLikedProjects(prev => new Set([...prev, projectId]));
        
        callback?.(true);
      }
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
    <section id="portfolio" className="py-20 bg-muted/30 scanlines">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-pixel mb-4">
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
          {displayedProjects.map((project) => (
            <Card 
              key={project.id} 
              className="overflow-hidden card-hover bg-card border-4 border-border cursor-pointer pixel-shadow"
              onClick={() => openProjectDetails(project)}
            >
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
                      <Button 
                        size="sm" 
                        variant="gradient" 
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {project.github_url && (
                      <Button 
                        size="sm" 
                        variant="glow" 
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
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
                  <h3 className="text-xl font-pixel-body font-semibold group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-2 border-primary">
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(project.id);
                    }}
                    className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors duration-300"
                  >
                    <Heart 
                      className={`w-4 h-4 ${likedProjects.has(project.id) ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                    <span className="text-sm">
                      {project.likes}
                    </span>
                  </button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProjectId(project.id);
                      setCommentsOpen(true);
                    }}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Comments
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProjects.length > 6 && (
          <div className="text-center mt-8">
            <Button variant="gradient" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "Show More"}
            </Button>
          </div>
        )}
      </div>
      {selectedProjectId && (
        <CommentsModal
          open={commentsOpen}
          onClose={() => setCommentsOpen(false)}
          projectId={selectedProjectId}
        />
      )}

      <ProjectDetails
        project={selectedProject}
        open={projectDetailsOpen}
        onClose={closeProjectDetails}
        liked={selectedProject ? likedProjects.has(selectedProject.id) : false}
        onLike={() => {
          if (selectedProject) {
            handleLike(selectedProject.id, () => {
              // Refresh selected project data after like
              const updated = projects.find(p => p.id === selectedProject.id);
              if (updated) setSelectedProject(updated);
            });
          }
        }}
        onOpenComments={() => {
          if (selectedProject) {
            setSelectedProjectId(selectedProject.id);
            setCommentsOpen(true);
          }
        }}
      />
    </section>
  );
};

export default Portfolio;