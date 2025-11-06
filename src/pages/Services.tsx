import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Mail, 
  Briefcase, 
  Building2,
  Receipt,
  AlertCircle,
  ArrowLeft,
  User,
  CheckCircle2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  const allServices = [
    {
      category: "Identity Services",
      icon: User,
      items: [
        {
          icon: FileText,
          title: "Resident Certificate",
          description: "Cheti cha Ukaaji - Digital proof of residence",
          time: "1-3 hrs",
          fee: "TSh 5,000",
          path: "/services/resident-certificate",
          status: "active"
        },
        {
          icon: Mail,
          title: "Introduction Letter",
          description: "Barua ya Utambulisho - Official introduction",
          time: "2-4 hrs",
          fee: "TSh 3,000",
          path: "/services/introduction-letter",
          status: "active"
        }
      ]
    },
    {
      category: "Business Services",
      icon: Briefcase,
      items: [
        {
          icon: Briefcase,
          title: "Business Permit",
          description: "Kibali cha Biashara - Business license",
          time: "48 hrs",
          fee: "TSh 50,000",
          path: "/services/business-permit",
          status: "active"
        }
      ]
    },
    {
      category: "Local Permits (Vibali)",
      icon: Building2,
      items: [
        {
          icon: Building2,
          title: "Construction Permit",
          description: "Kibali cha Ujenzi - Building permit",
          time: "7-14 days",
          fee: "TSh 100,000+",
          path: "/services/construction-permit",
          status: "active"
        },
        {
          icon: Building2,
          title: "Burial Permit",
          description: "Kibali cha Mazishi - Burial authorization",
          time: "1-3 days",
          fee: "TSh 10,000",
          path: "/services/burial-permit",
          status: "coming"
        },
        {
          icon: Building2,
          title: "Event Permit",
          description: "Kibali cha Sherehe - Event authorization",
          time: "5-10 days",
          fee: "TSh 30,000+",
          path: "/services/event-permit",
          status: "coming"
        }
      ]
    },
    {
      category: "Other Services",
      icon: Receipt,
      items: [
        {
          icon: Receipt,
          title: "Payment Services",
          description: "Pay fees, taxes, and penalties",
          time: "Instant",
          fee: "Variable",
          path: "/services/payments",
          status: "active"
        },
        {
          icon: AlertCircle,
          title: "Report Issue",
          description: "Report problems or corruption",
          time: "Instant",
          fee: "Free",
          path: "/services/report",
          status: "active"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 py-8">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {/* User Status Card */}
        <Card className="glass-card p-6 mb-8 max-w-4xl mx-auto border-border/50 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">John Doe</h3>
                  <Badge className="bg-secondary/20 text-secondary border-secondary/30">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">NIDA: 1234567890123456789</p>
                <p className="text-sm text-muted-foreground">Kinondoni Ward, Dar es Salaam</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              View Profile
            </Button>
          </div>
        </Card>

        {/* Services Sections */}
        <div className="max-w-7xl mx-auto space-y-12">
          {allServices.map((category, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">{category.category}</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((service, index) => (
                  <Card
                    key={index}
                    className={`glass-card p-6 border-border/50 transition-all ${
                      service.status === "active"
                        ? "hover:shadow-lg cursor-pointer group"
                        : "opacity-60"
                    }`}
                    onClick={() => service.status === "active" && navigate(service.path)}
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <service.icon className="w-6 h-6 text-primary" />
                        </div>
                        {service.status === "coming" && (
                          <Badge variant="secondary">Coming Soon</Badge>
                        )}
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{service.description}</p>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Processing Time:</span>
                            <span className="font-medium text-foreground">{service.time}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Fee:</span>
                            <span className="font-medium text-foreground">{service.fee}</span>
                          </div>
                        </div>
                      </div>

                      {service.status === "active" && (
                        <div className="space-y-2">
                          <Button className="w-full" variant="outline">
                            Apply Now
                          </Button>
                          <Button 
                            className="w-full" 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate("/services/open-case", { state: { service: service.title } });
                            }}
                          >
                            Fungua Shitaka / Open Case
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
