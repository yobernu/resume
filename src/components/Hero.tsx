import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="section-container relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Greeting */}
          <div className="mb-6 animate-fade-in">
            <span className="text-lg text-muted-foreground">Hello, I'm</span>
          </div>
          
          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in delay-200">
            <span className="gradient-text">Your Developer</span>
          </h1>
          
          {/* Role */}
          <h2 className="text-2xl md:text-3xl text-foreground/80 mb-8 animate-fade-in delay-300">
            Full-Stack Developer & Mobile App Specialist
          </h2>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in delay-400">
            {['Flutter', 'React', 'Python', 'React Native', 'DSA'].map((tech) => (
              <span 
                key={tech}
                className="px-4 py-2 bg-card border border-primary/20 rounded-full text-sm font-medium hover:border-primary hover:shadow-glow transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in delay-500">
            Passionate about creating beautiful, functional applications across web and mobile platforms. 
            I solve complex problems and build scalable solutions that make a difference.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in delay-600">
            <Button 
              variant="gradient" 
              size="lg"
              onClick={() => scrollToSection('portfolio')}
              className="font-semibold"
            >
              View My Work
            </Button>
            <Button 
              variant="glow" 
              size="lg"
              onClick={() => scrollToSection('contact')}
            >
              Get In Touch
            </Button>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-12 animate-fade-in delay-700">
            <a 
              href="#" 
              className="p-3 bg-card hover:bg-primary/10 border border-primary/20 hover:border-primary rounded-full transition-all duration-300 hover:shadow-glow"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="p-3 bg-card hover:bg-primary/10 border border-primary/20 hover:border-primary rounded-full transition-all duration-300 hover:shadow-glow"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="p-3 bg-card hover:bg-primary/10 border border-primary/20 hover:border-primary rounded-full transition-all duration-300 hover:shadow-glow"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
          
          {/* Scroll indicator */}
          <div className="animate-bounce animate-fade-in delay-1000">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <ArrowDown className="w-6 h-6 mx-auto" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;