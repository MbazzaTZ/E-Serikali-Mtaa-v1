import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowUpRight,
  Search,
  Filter,
  FileText,
  User
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [escalationNote, setEscalationNote] = useState("");
  const [escalationDept, setEscalationDept] = useState("");

  // Mock data - will be replaced with real data from backend
  const applications = [
    {
      id: "APP-2025-001",
      applicant: "John Doe",
      nida: "1234567890123456789",
      service: "Resident Certificate",
      submittedAt: "2025-01-05 10:30",
      status: "pending",
      fee: "TSh 5,000",
      ward: "Kinondoni"
    },
    {
      id: "APP-2025-002",
      applicant: "Jane Smith",
      nida: "9876543210987654321",
      service: "Business Permit",
      submittedAt: "2025-01-04 14:20",
      status: "pending",
      fee: "TSh 50,000",
      ward: "Ilala"
    },
    {
      id: "APP-2025-003",
      applicant: "Mohamed Ali",
      nida: "5555555555555555555",
      service: "Construction Permit",
      submittedAt: "2025-01-03 09:15",
      status: "escalated",
      fee: "TSh 100,000",
      ward: "Temeke"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30";
      case "approved": return "bg-green-500/20 text-green-600 border-green-500/30";
      case "declined": return "bg-red-500/20 text-red-600 border-red-500/30";
      case "escalated": return "bg-blue-500/20 text-blue-600 border-blue-500/30";
      default: return "bg-muted";
    }
  };

  const handleApprove = (appId: string) => {
    toast({
      title: "Application Approved",
      description: `${appId} has been approved and certificate will be issued`,
    });
  };

  const handleDecline = (appId: string) => {
    toast({
      title: "Application Declined",
      description: `${appId} has been declined`,
      variant: "destructive"
    });
  };

  const handleEscalate = () => {
    if (!escalationDept) {
      toast({
        title: "Error",
        description: "Please select a department",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Application Escalated",
      description: `Escalated to ${escalationDept}`,
    });
    setSelectedApp(null);
    setEscalationNote("");
    setEscalationDept("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage applications and escalate to departments</p>
        </div>

        {/* Filters */}
        <Card className="glass-card p-6 mb-6 border-border/50">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by ID or NIDA" className="pl-10" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Service Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="resident">Resident Certificate</SelectItem>
                <SelectItem value="business">Business Permit</SelectItem>
                <SelectItem value="construction">Construction Permit</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="declined">Declined</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </Card>

        {/* Applications List */}
        <div className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id} className="glass-card p-6 border-border/50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{app.id}</h3>
                      <p className="text-sm text-muted-foreground">{app.service}</p>
                    </div>
                    <Badge className={getStatusColor(app.status)}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Applicant</p>
                      <p className="font-medium text-foreground flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {app.applicant}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">NIDA</p>
                      <p className="font-medium text-foreground">{app.nida}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Ward</p>
                      <p className="font-medium text-foreground">{app.ward}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Submitted</p>
                      <p className="font-medium text-foreground">{app.submittedAt}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                    onClick={() => handleApprove(app.id)}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                    onClick={() => handleDecline(app.id)}
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Decline
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedApp(app)}
                      >
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                        Escalate
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Escalate Application</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-2">Select Department</p>
                          <Select value={escalationDept} onValueChange={setEscalationDept}>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fire">Fire Department</SelectItem>
                              <SelectItem value="police">Police</SelectItem>
                              <SelectItem value="immigration">Immigration</SelectItem>
                              <SelectItem value="health">Health Department</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="transport">Transportation</SelectItem>
                              <SelectItem value="nemc">NEMC (Environment)</SelectItem>
                              <SelectItem value="brela">BRELA (Business)</SelectItem>
                              <SelectItem value="ministry">Ministry</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Escalation Note</p>
                          <Textarea 
                            placeholder="Add note for department..."
                            value={escalationNote}
                            onChange={(e) => setEscalationNote(e.target.value)}
                            rows={4}
                          />
                        </div>
                        <Button onClick={handleEscalate} className="w-full">
                          Submit Escalation
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          <Card className="glass-card p-4 border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </Card>
          <Card className="glass-card p-4 border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-foreground">45</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </Card>
          <Card className="glass-card p-4 border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Declined</p>
                <p className="text-2xl font-bold text-foreground">3</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </Card>
          <Card className="glass-card p-4 border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Escalated</p>
                <p className="text-2xl font-bold text-foreground">8</p>
              </div>
              <ArrowUpRight className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
