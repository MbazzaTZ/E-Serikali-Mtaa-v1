import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, FileText, HelpCircle, BookOpen, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InfoCenter = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "What is NIDA and why do I need it?",
      answer: "NIDA (National Identification Authority) is your national ID number. It's the primary identification required for all government services. If you don't have NIDA, you can use alternative IDs like TIN, Driver License, Passport, or Guardian Consent."
    },
    {
      question: "How long does it take to process my application?",
      answer: "Processing times vary by service: Resident Certificate (1-3 hrs), Introduction Letter (2-4 hrs), Business Permit (48 hrs), Construction Permit (7-14 days). You can track your application status in real-time."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept M-Pesa, Tigo Pesa, Airtel Money, and bank cards. All payments are processed securely and you'll receive an instant receipt."
    },
    {
      question: "Can I apply from anywhere in Tanzania?",
      answer: "Yes! Our portal is 100% digital. You can apply from anywhere with internet access. Your application will be processed by your registered ward office."
    },
    {
      question: "What if my application is declined?",
      answer: "You'll receive a detailed explanation and can either resubmit with corrections or file an appeal through the case management system."
    },
    {
      question: "How do I open a case (Fungua Shitaka)?",
      answer: "You can open a case for any permit or service directly from the services page. Cases are tracked with unique IDs and you'll receive updates on their progress."
    },
    {
      question: "Are my documents secure?",
      answer: "Yes. We use TLS 1.3 encryption, PKI digital signatures, and maintain immutable audit logs. All documents are stored securely and accessible only to you and authorized personnel."
    },
    {
      question: "Can non-citizens use this portal?",
      answer: "Absolutely! Non-citizens can access services using Passport + Visa, TIN, or other valid identification."
    }
  ];

  const guides = [
    {
      title: "Getting Started Guide",
      description: "Learn how to verify your identity and navigate the portal",
      icon: BookOpen
    },
    {
      title: "How to Apply for Resident Certificate",
      description: "Step-by-step guide for Cheti cha Ukaaji",
      icon: FileText
    },
    {
      title: "Business Permit Application",
      description: "Complete guide to getting your business license",
      icon: FileText
    },
    {
      title: "Understanding Local Permits (Vibali)",
      description: "Everything about construction, burial, and event permits",
      icon: FileText
    }
  ];

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
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Information Center
            </h1>
            <p className="text-lg text-muted-foreground">
              Find answers, guides, and resources to help you navigate government services
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="glass-card p-6 border-border/50 text-center cursor-pointer hover:shadow-lg transition-all">
              <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-foreground">Guides</h3>
              <p className="text-sm text-muted-foreground">Step-by-step tutorials</p>
            </Card>
            <Card className="glass-card p-6 border-border/50 text-center cursor-pointer hover:shadow-lg transition-all">
              <HelpCircle className="w-8 h-8 text-secondary mx-auto mb-2" />
              <h3 className="font-semibold text-foreground">FAQs</h3>
              <p className="text-sm text-muted-foreground">Common questions</p>
            </Card>
            <Card className="glass-card p-6 border-border/50 text-center cursor-pointer hover:shadow-lg transition-all">
              <Download className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-foreground">Downloads</h3>
              <p className="text-sm text-muted-foreground">Forms & documents</p>
            </Card>
          </div>

          {/* Guides Section */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">User Guides</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {guides.map((guide, idx) => (
                <Card key={idx} className="glass-card p-6 border-border/50 hover:shadow-lg transition-all cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <guide.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{guide.title}</h3>
                      <p className="text-sm text-muted-foreground">{guide.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <Card className="glass-card p-6 border-border/50">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>

          {/* Contact CTA */}
          <Card className="glass-card p-8 border-border/50 bg-gradient-to-r from-primary/10 to-secondary/10 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Still Need Help?</h2>
            <p className="text-muted-foreground mb-6">
              Our support team is ready to assist you
            </p>
            <Button onClick={() => navigate("/contact")}>
              Contact Support
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InfoCenter;
