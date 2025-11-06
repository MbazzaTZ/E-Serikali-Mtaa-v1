import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Building2, ClipboardList, Users, Briefcase, ShieldCheck, LayoutDashboard } from "lucide-react";
import AuthModal from "@/components/AuthModal";

export default function Home() {
  const [user, setUser] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (username: string) => {
    setUser(username);
    setShowLogin(false);
  };

  const services = [
    {
      title: "Resident Certificate",
      desc: "Apply for official proof of residence within your local government area.",
      path: "/forms/resident-certificate",
      icon: <FileText className="w-10 h-10 text-primary" />,
    },
    {
      title: "Introduction Letter",
      desc: "Request a formal letter of introduction for administrative or official use.",
      path: "/forms/introduction-letter",
      icon: <ClipboardList className="w-10 h-10 text-primary" />,
    },
    {
      title: "Business Permit",
      desc: "Apply for or renew your local business operating permit.",
      path: "/forms/business-permit",
      icon: <Briefcase className="w-10 h-10 text-primary" />,
    },
    {
      title: "Community Development",
      desc: "Submit community-based project applications and requests.",
      path: "/forms/community-development",
      icon: <Users className="w-10 h-10 text-primary" />,
    },
    {
      title: "Local Permits (Vibali)",
      desc: "Request local permits for construction, events, burial, or sanitation.",
      path: "/vibali",
      icon: <Building2 className="w-10 h-10 text-primary" />,
    },
    {
      title: "My Dashboard",
      desc: "View your applications, download issued documents, and track approvals.",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-10 h-10 text-primary" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black text-gray-800 dark:text-white p-6">
      {/* Login / Verification */}
      {showLogin && <AuthModal onLogin={handleLogin} />}

      <div className="max-w-6xl mx-auto text-center mt-12 space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-primary"
        >
          Tanzania Local Government e-Services Portal
        </motion.h1>

        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Access official digital services for residents, businesses, and communities under TAMISEMI.
          Apply, verify, and receive your documents online.
        </p>

        {!user ? (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowLogin(true)}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition text-lg shadow-lg"
            >
              Get Started / Verify Identity
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mt-8 text-secondary">
              Welcome, {user} 👋
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-10">
              Choose a service below to begin your application.
            </p>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="glass-card p-6 flex flex-col items-center text-center space-y-4"
                >
                  <div className="bg-primary/10 p-4 rounded-full">{service.icon}</div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{service.desc}</p>
                  <Link
                    to={service.path}
                    className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
                  >
                    Access Service
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center mt-16 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Government of the United Republic of Tanzania — TAMISEMI
      </footer>
    </div>
  );
}
