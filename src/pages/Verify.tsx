import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2,
  User,
  Phone,
  Calendar,
  MapPin,
  Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Verify = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"nida" | "details">("nida");
  const [formData, setFormData] = useState({
    nidaNumber: "",
    fullName: "",
    dob: "",
    phone: "",
    region: "",
    district: "",
    ward: "",
    village: ""
  });

  const handleNidaVerify = () => {
    if (!formData.nidaNumber || formData.nidaNumber.length < 10) {
      toast({
        title: "Invalid NIDA",
        description: "Please enter a valid NIDA number",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("details");
      toast({
        title: "NIDA Verified",
        description: "Please complete your profile",
      });
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Verification Complete",
        description: "Redirecting to services...",
      });
      navigate("/services");
    }, 2000);
  };

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

        <div className="max-w-2xl mx-auto">
          <Card className="glass-card p-8 border-border/50">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                NIDA Verification
              </h1>
              <p className="text-muted-foreground">
                Verify your identity to access all government services
              </p>
            </div>

            {/* Progress */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === "nida" ? "bg-primary text-white" : "bg-secondary text-white"
                }`}>
                  {step === "details" ? <CheckCircle2 className="w-5 h-5" /> : "1"}
                </div>
                <span className="ml-2 text-sm font-medium">NIDA</span>
              </div>
              <div className="w-16 h-0.5 bg-border" />
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === "details" ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                }`}>
                  2
                </div>
                <span className="ml-2 text-sm font-medium">Details</span>
              </div>
            </div>

            {/* Step 1: NIDA Verification */}
            {step === "nida" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nida">NIDA Number</Label>
                  <Input
                    id="nida"
                    placeholder="Enter your 20-digit NIDA number"
                    value={formData.nidaNumber}
                    onChange={(e) => setFormData({...formData, nidaNumber: e.target.value})}
                    maxLength={20}
                    className="text-lg"
                  />
                  <p className="text-xs text-muted-foreground">
                    Your NIDA number is found on your National ID card
                  </p>
                </div>

                <Button
                  onClick={handleNidaVerify}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-primary-glow"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 mr-2" />
                      Verify NIDA
                    </>
                  )}
                </Button>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground text-center mb-3">
                    Don't have NIDA? Use alternative ID
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" onClick={() => {
                      toast({ title: "Alternative Verification", description: "TIN verification coming soon" });
                    }}>
                      TIN Number
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => {
                      toast({ title: "Alternative Verification", description: "Driver License verification coming soon" });
                    }}>
                      Driver License
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => {
                      toast({ title: "Alternative Verification", description: "Passport verification coming soon" });
                    }}>
                      Passport
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => {
                      toast({ title: "Alternative Verification", description: "Guardian consent verification coming soon" });
                    }}>
                      Guardian Consent
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Complete Details */}
            {step === "details" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <Badge className="bg-secondary/10 text-secondary border-secondary/30 mb-4">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  NIDA Verified
                </Badge>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      <User className="w-4 h-4 inline mr-1" />
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Date of Birth
                    </Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({...formData, dob: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+255 XXX XXX XXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="region">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Region
                    </Label>
                    <Input
                      id="region"
                      value={formData.region}
                      onChange={(e) => setFormData({...formData, region: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      value={formData.district}
                      onChange={(e) => setFormData({...formData, district: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ward">Ward</Label>
                    <Input
                      id="ward"
                      value={formData.ward}
                      onChange={(e) => setFormData({...formData, ward: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="village">Village/Street</Label>
                    <Input
                      id="village"
                      value={formData.village}
                      onChange={(e) => setFormData({...formData, village: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-secondary to-secondary-glow"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Completing...
                    </>
                  ) : (
                    "Complete Verification"
                  )}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Verify;
