import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/home/Home";
import Dashboard from "@/pages/dashboard/Dashboard";
import VibaliMain from "@/pages/VibaliMain";
import ResidentCertificateForm from "@/pages/forms/ResidentCertificateForm";
import BusinessPermitForm from "@/pages/forms/BusinessPermitForm";
import IntroductionLetterForm from "@/pages/forms/IntroductionLetterForm";
import CommunityDevelopmentForm from "@/pages/forms/CommunityDevelopmentForm";

// Permit Pages
import UjenziPermitForm from "@/pages/permits/UjenziPermitForm";
import MazishiPermitForm from "@/pages/permits/MazishiPermitForm";
import EventEntertainmentPermitForm from "@/pages/permits/EventEntertainmentPermitForm";
import TransportationPermitForm from "@/pages/permits/TransportationPermitForm";
import KilimoUmwagiliajiPermitForm from "@/pages/permits/KilimoUmwagiliajiPermitForm";
import UsafiPermitForm from "@/pages/permits/UsafiPermitForm";
import MikusanyikoMikutanoPermitForm from "@/pages/permits/MikusanyikoMikutanoPermitForm";

// Global Styles
import "@/index.css";
import "@/styles/globals.css";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#f1f8e9] to-[#e3f2fd] dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
        {/* Top Navigation */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Forms Section */}
            <Route
              path="/forms/resident-certificate"
              element={<ResidentCertificateForm />}
            />
            <Route path="/forms/business-permit" element={<BusinessPermitForm />} />
            <Route
              path="/forms/introduction-letter"
              element={<IntroductionLetterForm />}
            />
            <Route
              path="/forms/community-development"
              element={<CommunityDevelopmentForm />}
            />

            {/* Permits Section */}
            <Route path="/vibali" element={<VibaliMain />} />
            <Route path="/permits/ujenzi" element={<UjenziPermitForm />} />
            <Route path="/permits/mazishi" element={<MazishiPermitForm />} />
            <Route
              path="/permits/matukio"
              element={<EventEntertainmentPermitForm />}
            />
            <Route
              path="/permits/usafirishaji"
              element={<TransportationPermitForm />}
            />
            <Route
              path="/permits/kilimo"
              element={<KilimoUmwagiliajiPermitForm />}
            />
            <Route path="/permits/usafi" element={<UsafiPermitForm />} />
            <Route
              path="/permits/mikusanyiko"
              element={<MikusanyikoMikutanoPermitForm />}
            />

            {/* 404 Fallback */}
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                  <h1 className="text-5xl font-bold text-primary mb-4">404</h1>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Samahani, ukurasa huu haupatikani.
                  </p>
                  <a
                    href="/"
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
                  >
                    Rudi Nyumbani
                  </a>
                </div>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}
