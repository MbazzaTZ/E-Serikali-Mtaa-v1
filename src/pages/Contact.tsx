import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We'll get back to you within 24 hours",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Contact Us</h1>
            <p className="text-muted-foreground mb-6">
              Have questions? We're here to help you navigate government services
            </p>

            <Card className="glass-card p-6 border-border/50">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your@email.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+255 XXX XXX XXX" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Describe your inquiry..." 
                    rows={5}
                    required 
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary-glow">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Get in Touch</h2>

            <Card className="glass-card p-6 border-border/50">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                  <p className="text-sm text-muted-foreground">+255 22 211 2898</p>
                  <p className="text-sm text-muted-foreground">Toll Free: 0800 123 456</p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email</h3>
                  <p className="text-sm text-muted-foreground">support@tanzaniagovportal.go.tz</p>
                  <p className="text-sm text-muted-foreground">info@poralg.go.tz</p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Address</h3>
                  <p className="text-sm text-muted-foreground">
                    President's Office - Regional Administration<br />
                    and Local Government (PO-RALG)<br />
                    Dodoma, Tanzania
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Working Hours</h3>
                  <p className="text-sm text-muted-foreground">Monday - Friday: 8:00 AM - 4:00 PM</p>
                  <p className="text-sm text-muted-foreground">Saturday - Sunday: Closed</p>
                  <p className="text-sm text-primary mt-2">Online Services: 24/7</p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 border-border/50 bg-gradient-to-r from-primary/10 to-secondary/10">
              <h3 className="font-semibold text-foreground mb-2">Need Immediate Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Visit our Information Center for FAQs, guides, and instant answers
              </p>
              <Button onClick={() => navigate("/info")} className="w-full">
                Visit Information Center
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
