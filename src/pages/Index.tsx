import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Mail, 
  Briefcase, 
  Building2, 
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Clock,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<"en" | "sw">("en");

  const services = [
    {
      icon: FileText,
      title: language === "en" ? "Resident Certificate" : "Cheti cha Ukaaji",
      description: language === "en" 
        ? "Digital certificate for proof of residence"
        : "Cheti cha kidijitali cha uthibitisho wa makazi",
      time: "1-3 hrs",
      color: "text-primary",
      path: "/services/resident-certificate"
    },
    {
      icon: Mail,
      title: language === "en" ? "Introduction Letter" : "Barua ya Utambulisho",
      description: language === "en"
        ? "Official introduction for various purposes"
        : "Utambulisho rasmi kwa madhumuni mbalimbali",
      time: "2-4 hrs",
      color: "text-secondary",
      path: "/services/introduction-letter"
    },
    {
      icon: Briefcase,
      title: language === "en" ? "Business Permit" : "Kibali cha Biashara",
      description: language === "en"
        ? "License for business operations"
        : "Leseni ya uendeshaji biashara",
      time: "48 hrs",
      color: "text-accent",
      path: "/services/business-permit"
    },
    {
      icon: Building2,
      title: language === "en" ? "Local Permits" : "Vibali vya Mitaa",
      description: language === "en"
        ? "Construction, events, burial & more"
        : "Ujenzi, sherehe, mazishi na mengineyo",
      time: "3-14 days",
      color: "text-primary",
      path: "/services/local-permits"
    }
  ];

  const stats = [
    { icon: Users, value: "100%", label: language === "en" ? "Inclusion" : "Ujumuishaji" },
    { icon: Clock, value: "< 48hrs", label: language === "en" ? "Processing" : "Usindikaji" },
    { icon: CheckCircle2, value: "95%", label: language === "en" ? "Digital" : "Kidijitali" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Header */}
      <header className="border-b border-border/50 glass-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">
                {language === "en" ? "Tanzania Local Government" : "Serikali za Mitaa Tanzania"}
              </h1>
              <p className="text-xs text-muted-foreground">
                {language === "en" ? "Digital Services Portal" : "Huduma za Kidijitali"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "sw" : "en")}
              className="text-xs"
            >
              {language === "en" ? "Kiswahili" : "English"}
            </Button>
            <Button variant="outline" size="sm">
              {language === "en" ? "Sign In" : "Ingia"}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Badge className="bg-secondary/10 text-secondary border-secondary/30 mb-4">
            {language === "en" ? "NIDA is All You Need" : "NIDA Inatosha"}
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            {language === "en" ? (
              <>One Portal, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">All Services</span></>
            ) : (
              <>Kituo Kimoja, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Huduma Zote</span></>
            )}
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === "en" 
              ? "Access every local government service digitally. No physical visits required. 100% inclusion guaranteed."
              : "Pata huduma zote za serikali za mitaa kidijitali. Hakuna mahitaji ya kutembelea ofisi. Ujumuishaji 100%."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 text-white"
              onClick={() => navigate("/verify")}
            >
              {language === "en" ? "Get Started with NIDA" : "Anza na NIDA"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/about")}>
              {language === "en" ? "About" : "Kuhusu"}
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/info")}>
              {language === "en" ? "Info Center" : "Kituo cha Habari"}
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/contact")}>
              {language === "en" ? "Contact" : "Wasiliana Nasi"}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 pt-12 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="flex justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {language === "en" ? "Available Services" : "Huduma Zinazopatikana"}
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === "en"
              ? "All services accessible with your NIDA. Fast, secure, and 100% digital."
              : "Huduma zote zinapatikana kwa NIDA yako. Haraka, salama, na kidijitali 100%."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="glass-card p-6 hover:shadow-lg transition-all cursor-pointer group border-border/50"
              onClick={() => navigate(service.path)}
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${
                  service.color === "text-primary" ? "from-primary/20 to-primary/10" :
                  service.color === "text-secondary" ? "from-secondary/20 to-secondary/10" :
                  "from-accent/20 to-accent/10"
                } flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{service.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {service.time}
                    </Badge>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <Card className="glass-card p-8 md:p-12 text-center max-w-4xl mx-auto border-border/50 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {language === "en" ? "Ready to Get Started?" : "Uko Tayari Kuanza?"}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {language === "en"
              ? "Verify your identity with NIDA and access all government services in minutes."
              : "Thibitisha utambulisho wako na NIDA na upate huduma zote za serikali kwa dakika."}
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
            onClick={() => navigate("/verify")}
          >
            {language === "en" ? "Verify with NIDA" : "Thibitisha na NIDA"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 glass-card py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/about")}>
              {language === "en" ? "About" : "Kuhusu"}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/contact")}>
              {language === "en" ? "Contact Us" : "Wasiliana Nasi"}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/info")}>
              {language === "en" ? "Info Center" : "Kituo cha Habari"}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
              Admin
            </Button>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 {language === "en" ? "President's Office - Regional Administration and Local Government (PO-RALG)" : "Ofisi ya Rais - Tawala za Mikoa na Serikali za Mitaa (PO-RALG)"}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {language === "en" ? "Powered by NIDA • All Rights Reserved" : "Inayotumia NIDA • Haki Zote Zimehifadhiwa"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
