import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Heart, MessageCircle, X } from "lucide-react";

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

interface ProjectDetailsProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
  liked: boolean;
  onLike: () => void;
  onOpenComments: () => void;
}

export default function ProjectDetails({ 
  project, 
  open, 
  onClose, 
  liked, 
  onLike,
  onOpenComments 
}: ProjectDetailsProps) {
  if (!project) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-2xl overflow-y-auto bg-background/95 backdrop-blur-sm border-l border-border/50"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>

        <div className="space-y-6 pt-2">
          {/* Project Image */}
          <div className="relative rounded-xl overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            <Badge 
              variant="secondary" 
              className="absolute top-4 right-4 bg-primary/90 text-primary-foreground"
            >
              {project.category}
            </Badge>
          </div>

          {/* Title & Actions */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {project.live_url && (
              <Button variant="gradient" asChild className="gap-2">
                <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.github_url && (
              <Button variant="outline" asChild className="gap-2">
                <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  View Code
                </a>
              </Button>
            )}
            <Button 
              variant="outline" 
              className={`gap-2 ${liked ? 'text-red-500 border-red-200' : ''}`}
              onClick={onLike}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-red-500' : ''}`} />
              {liked ? 'Liked' : 'Like'}
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={onOpenComments}
            >
              <MessageCircle className="w-4 h-4" />
              Comments
            </Button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="border-primary/30 text-primary"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Large Description */}
          {project.large_description && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">About this project</h3>
              <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
                {project.large_description}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-6 pt-4 border-t border-border/50">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{project.likes} likes</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Badge variant={project.finished ? "default" : "secondary"} className="text-xs">
                {project.finished ? "Completed" : "In Progress"}
              </Badge>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
