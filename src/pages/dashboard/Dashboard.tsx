import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText,
  CheckCircle2,
  Download,
  Loader2,
  ShieldCheck,
  Search,
  XCircle,
  Home,
  LogOut,
  User,
} from "lucide-react";
import QRCode from "qrcode";
import { generateOfficialPDF } from "@/lib/useGeneratePDF";

interface Submission {
  id: string;
  service: string;
  applicant: string;
  status: string;
  certificateNumber?: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingResult, setTrackingResult] = useState<Submission | null>(null);
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(
    localStorage.getItem("verifiedUser")
  );

  useEffect(() => {
    // preload mock applications
    setSubmissions([
      {
        id: "1",
        service: "Resident Certificate",
        applicant: "David Mbazza",
        status: "Approved",
        certificateNumber: "CT-2000-D-DAR-0000-0001",
      },
      {
        id: "2",
        service: "Business Permit",
        applicant: "David Mbazza",
        status: "Pending",
        certificateNumber: "BP-2000-D-DAR-0000-0002",
      },
      {
        id: "3",
        service: "Introduction Letter",
        applicant: "David Mbazza",
        status: "Approved",
        certificateNumber: "IL-2000-D-DAR-0000-0003",
      },
    ]);
  }, []);

  const handleDownload = async (item: Submission) => {
    setLoading(true);
    try {
      await generateOfficialPDF({
        title: item.service,
        fields: {
          Applicant: item.applicant,
          CertificateNumber: item.certificateNumber || "N/A",
          Status: item.status,
          Date: new Date().toLocaleDateString(),
        },
        language: "sw",
      });
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTracking = async () => {
    const found = submissions.find(
      (s) => s.certificateNumber === trackingNumber.trim()
    );
    if (found) {
      setTrackingResult(found);
      const qr = await QRCode.toDataURL(
        `https://tamisemi.go.tz/verify/${found.certificateNumber}`
      );
      setQrImage(qr);
    } else {
      setTrackingResult(null);
      setQrImage(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("verifiedUser");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black text-gray-800 dark:text-white p-6">
      <div className="max-w-6xl mx-auto mt-6 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <h1 className="text-3xl font-bold text-primary">My Dashboard</h1>
          <div className="flex gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
            >
              <Home className="w-4 h-4" /> Back to Home
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Verification Status */}
        {!user ? (
          <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-lg text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-700 dark:text-yellow-300">
            <p className="flex items-center gap-2">
              <User className="w-5 h-5" />
              You are currently viewing as a guest. Please verify your identity to
              personalize your dashboard and save progress.
            </p>
            <Link
              to="/"
              className="inline-block mt-3 bg-primary text-white px-3 py-2 rounded-lg hover:bg-secondary transition"
            >
              Verify Identity
            </Link>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Welcome, <span className="font-semibold text-secondary">{user}</span>
            </p>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-5 text-center space-y-2">
            <FileText className="w-8 h-8 text-primary mx-auto" />
            <h3 className="text-xl font-semibold">Total Applications</h3>
            <p className="text-2xl font-bold">{submissions.length}</p>
          </div>
          <div className="glass-card p-5 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto" />
            <h3 className="text-xl font-semibold">Approved</h3>
            <p className="text-2xl font-bold">
              {submissions.filter((s) => s.status === "Approved").length}
            </p>
          </div>
          <div className="glass-card p-5 text-center space-y-2">
            <Loader2 className="w-8 h-8 text-yellow-400 mx-auto" />
            <h3 className="text-xl font-semibold">Pending</h3>
            <p className="text-2xl font-bold">
              {submissions.filter((s) => s.status === "Pending").length}
            </p>
          </div>
          <div className="glass-card p-5 text-center space-y-2">
            <ShieldCheck className="w-8 h-8 text-blue-500 mx-auto" />
            <h3 className="text-xl font-semibold">Verified User</h3>
            <p className="text-2xl font-bold">{user ? "Yes" : "No"}</p>
          </div>
        </div>

        {/* Applications Table */}
        <div className="glass-card p-6 overflow-x-auto">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            My Applications
          </h2>
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                <th className="py-2 px-3">#</th>
                <th className="py-2 px-3">Service</th>
                <th className="py-2 px-3">Certificate No.</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100/20 transition"
                >
                  <td className="py-2 px-3">{index + 1}</td>
                  <td className="py-2 px-3">{item.service}</td>
                  <td className="py-2 px-3 font-mono">
                    {item.certificateNumber || "—"}
                  </td>
                  <td
                    className={`py-2 px-3 font-medium ${
                      item.status === "Approved"
                        ? "text-green-500"
                        : item.status === "Pending"
                        ? "text-yellow-400"
                        : "text-gray-400"
                    }`}
                  >
                    {item.status}
                  </td>
                  <td className="py-2 px-3 text-center">
                    {item.status === "Approved" ? (
                      <button
                        onClick={() => handleDownload(item)}
                        disabled={loading}
                        className="bg-primary text-white px-3 py-1 rounded-lg hover:bg-secondary transition text-sm"
                      >
                        {loading ? "Processing..." : "Download PDF"}
                      </button>
                    ) : (
                      <span className="text-gray-400 italic">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tracking Section */}
        <div className="glass-card p-6 mt-10 text-center space-y-4">
          <h2 className="text-2xl font-semibold text-primary mb-3">
            Verify Certificate or Permit
          </h2>
          <p className="text-gray-500 dark:text-gray-300">
            Enter your Certificate or Permit Number to confirm authenticity.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-4">
            <input
              type="text"
              placeholder="Enter Certificate or Permit Number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent w-full sm:w-96 text-center"
            />
            <button
              onClick={handleTracking}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition flex items-center gap-2"
            >
              <Search className="w-5 h-5" /> Track
            </button>
          </div>

          {trackingNumber && (
            <div className="mt-6">
              {trackingResult ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 border border-primary/30 rounded-xl bg-primary/5 inline-block"
                >
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Verified Document ✅
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Service:</strong> {trackingResult.service}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Applicant:</strong> {trackingResult.applicant}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Status:</strong> {trackingResult.status}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    <strong>Certificate No.:</strong>{" "}
                    {trackingResult.certificateNumber}
                  </p>
                  {qrImage && (
                    <div className="flex justify-center">
                      <img
                        src={qrImage}
                        alt="QR Verification"
                        className="w-32 h-32 border border-gray-300 dark:border-gray-700 rounded-lg"
                      />
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-6 border border-red-300 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl inline-block"
                >
                  <XCircle className="inline-block w-6 h-6 mb-1" /> No record found.
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-10 text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Government of the United Republic of Tanzania — TAMISEMI
        </footer>
      </div>
    </div>
  );
}
