import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram, Youtube, BookOpen, Code, Code2, Palette, Circle, Link } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Icon mapping for social links
const iconMap: { [key: string]: React.ComponentType<any> } = {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Instagram,
  Youtube,
  BookOpen,
  Code,
  Code2,
  Palette,
  Circle,
  Link
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{ name: formData.name, email: formData.email, message: formData.subject + ': ' + formData.message }]);

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "yobernu@gmail.com",
      href: "mailto:yobernu@gmail.com"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+251 (973) 535000",
      href: "tel:+251973535000"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Hosanna, Ethiopia",
      href: "https://maps.app.goo.gl/Nzz13TdVzZqEovbk8"
    }
  ];

  useEffect(() => {
    const fetchSocialLinks = async () => {
      const { data, error } = await supabase
        .from('social_media_links')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      if (!error && data) setSocialLinks(data);
    };
    fetchSocialLinks();
  }, []);

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to work together? I'd love to hear about your project and discuss how I can help bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8 card-hover bg-gradient-card border-primary/10">
            <h3 className="text-2xl font-semibold mb-6">Send me a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-muted/50 border-border focus:border-primary"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-muted/50 border-border focus:border-primary"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-muted/50 border-border focus:border-primary"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-muted/50 border-border focus:border-primary resize-none"
                  placeholder="Tell me about your project or how I can help..."
                />
              </div>
              
              <Button 
                type="submit" 
                variant="gradient" 
                size="lg" 
                disabled={isSubmitting}
                className="w-full font-semibold"
              >
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="p-6 bg-gradient-card border-primary/10">
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-300 group"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      {info.icon}
                    </div>
                    <div>
                      <p className="font-medium">{info.label}</p>
                      <p className="text-muted-foreground text-sm">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </Card>

            {/* Social Links */}
            <Card className="p-6 bg-gradient-card border-primary/10">
              <h3 className="text-xl font-semibold mb-6">Connect with me</h3>
              <div className="space-y-4">
                {socialLinks.map((social) => {
                  const IconComponent = iconMap[social.icon] || Link;
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-300 group"
                    >
                      <div className="p-2 bg-secondary/10 rounded-lg text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium">{social.display_name}</p>
                        <p className="text-muted-foreground text-sm">{social.platform}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </Card>

            {/* Availability */}
            <Card className="p-6 bg-gradient-card border-primary/10">
              <h3 className="text-xl font-semibold mb-4">Availability</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Response Time</span>
                  <span className="text-accent font-medium">Within 24 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Current Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-500 font-medium">Available for projects</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Preferred Contact</span>
                  <span className="text-primary font-medium" onClick={() => setFormData({ name: "", email: "yobernu@gmail.com", subject: "", message: "" })}>Email</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;