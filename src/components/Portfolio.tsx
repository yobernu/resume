import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ExternalLink, Github, MessageCircle } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  likes: number;
  category: string;
}

const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const [likedProjects, setLikedProjects] = useState<Set<number>>(new Set());

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Mobile App",
      description: "A full-featured e-commerce app built with Flutter, featuring real-time inventory, payment integration, and user reviews.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
      tags: ["Flutter", "Firebase", "Stripe"],
      githubUrl: "#",
      liveUrl: "#",
      likes: 24,
      category: "Mobile"
    },
    {
      id: 2,
      title: "Task Management Dashboard",
      description: "React-based project management tool with real-time collaboration, drag-and-drop interface, and team analytics.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71",
      tags: ["React", "TypeScript", "Node.js"],
      githubUrl: "#",
      liveUrl: "#",
      likes: 18,
      category: "Web"
    },
    {
      id: 3,
      title: "AI Chat Application",
      description: "Python-powered chatbot with natural language processing, context awareness, and multi-platform deployment.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      tags: ["Python", "FastAPI", "OpenAI"],
      githubUrl: "#",
      liveUrl: "#",
      likes: 32,
      category: "AI/ML"
    },
    {
      id: 4,
      title: "Fitness Tracking App",
      description: "Cross-platform fitness app with workout tracking, nutrition logging, and social features built with React Native.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
      tags: ["React Native", "Expo", "MongoDB"],
      githubUrl: "#",
      liveUrl: "#",
      likes: 27,
      category: "Mobile"
    },
    {
      id: 5,
      title: "Algorithm Visualizer",
      description: "Interactive web application for visualizing sorting and graph algorithms, perfect for learning data structures.",
      image: "https://images.unsplash.com/photo-1518186233392-c232efbf2373",
      tags: ["React", "D3.js", "Algorithms"],
      githubUrl: "#",
      liveUrl: "#",
      likes: 41,
      category: "Web"
    },
    {
      id: 6,
      title: "Weather Prediction ML",
      description: "Machine learning model for weather forecasting using historical data, deployed with a clean Python API.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b",
      tags: ["Python", "TensorFlow", "scikit-learn"],
      githubUrl: "#",
      liveUrl: "#",
      likes: 15,
      category: "AI/ML"
    }
  ];

  const categories = ["All", "Web", "Mobile", "AI/ML"];
  
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(project => project.category === filter);

  const handleLike = (projectId: number) => {
    setLikedProjects(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(projectId)) {
        newLiked.delete(projectId);
      } else {
        newLiked.add(projectId);
      }
      return newLiked;
    });
  };

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
                    <Button size="sm" variant="gradient" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button size="sm" variant="glow" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
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
                  
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Comments
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;