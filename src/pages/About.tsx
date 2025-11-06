import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Shield, Users, Zap, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

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

        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              About Tanzania Local Government Portal
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              NIDA is All You Need – One Portal, All Services, Full Inclusion
            </p>
          </div>

          {/* Mission */}
          <Card className="glass-card p-8 border-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Tanzania Local Government Portal is a national, inclusive, digital-first platform 
              that enables all citizens and non-citizens to access every local government service 
              using only NIDA (or alternative identification). We are committed to eliminating 
              physical visits and making government services 100% accessible digitally.
            </p>
          </Card>

          {/* Core Principles */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass-card p-6 border-border/50">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Inclusion</h3>
              <p className="text-muted-foreground">
                NIDA = Full Access. No one gets left behind. Alternative IDs available for all.
              </p>
            </Card>

            <Card className="glass-card p-6 border-border/50">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Digital-First</h3>
              <p className="text-muted-foreground">
                All outputs delivered as PDF with QR codes and auto-send capabilities.
              </p>
            </Card>

            <Card className="glass-card p-6 border-border/50">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Transparency</h3>
              <p className="text-muted-foreground">
                Real-time tracking, complete audit logs, and instant status updates.
              </p>
            </Card>

            <Card className="glass-card p-6 border-border/50">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Security</h3>
              <p className="text-muted-foreground">
                TLS 1.3 encryption, PKI digital signatures, and immutable audit trails.
              </p>
            </Card>
          </div>

          {/* Services */}
          <Card className="glass-card p-8 border-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-4">All Services in One Portal</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Identity Services</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Resident Certificate</li>
                  <li>• Introduction Letter</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Business Services</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Business Permit</li>
                  <li>• BRELA Integration</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Local Permits (Vibali)</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Construction Permit</li>
                  <li>• Burial Permit</li>
                  <li>• Event Permit</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Contact CTA */}
          <Card className="glass-card p-8 border-border/50 bg-gradient-to-r from-primary/10 to-secondary/10 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Need Help?</h2>
            <p className="text-muted-foreground mb-6">
              Visit our Information Center or contact us for assistance
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate("/info")}>
                Information Center
              </Button>
              <Button variant="outline" onClick={() => navigate("/contact")}>
                Contact Us
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
