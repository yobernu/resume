import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Experience from "@/components/Experience";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Portfolio />
      <Experience />
      <Resume />
      <Contact />
      
      {/* Footer */}
      <footer className="bg-card border-t border-border/50 py-8">
        <div className="section-container">
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2024 Your Name. Built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
