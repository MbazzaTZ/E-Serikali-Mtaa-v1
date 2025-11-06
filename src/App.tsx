import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Home & Dashboard
import Home from "@/pages/home/Home";
import Dashboard from "@/pages/dashboard/Dashboard";

// Verification
import VerificationForm from "@/pages/home/VerificationForm";

// Forms
import ResidentCertificateForm from "@/pages/forms/ResidentCertificateForm";
import BusinessPermitForm from "@/pages/forms/BusinessPermitForm";
import IntroductionLetterForm from "@/pages/forms/IntroductionLetterForm";
import CommunityDevelopmentForm from "@/pages/forms/CommunityDevelopmentForm";

// Vibali (Permits)
import VibaliMain from "@/pages/VibaliMain";
import UjenziPermitForm from "@/pages/permits/UjenziPermitForm";
import MazishiPermitForm from "@/pages/permits/MazishiPermitForm";
import EventEntertainmentPermitForm from "@/pages/permits/EventEntertainmentPermitForm";
import TransportationPermitForm from "@/pages/permits/TransportationPermitForm";
import KilimoUmwagiliajiPermitForm from "@/pages/permits/KilimoUmwagiliajiPermitForm";
import UsafiPermitForm from "@/pages/permits/UsafiPermitForm";
import MikusanyikoMikutanoPermitForm from "@/pages/permits/MikusanyikoMikutanoPermitForm";

// Utility PDF Example
import UseGeneratePDFExample from "@/lib/useGeneratePDFExample";

// Styles
import "@/styles/globals.css";

export default function App() {
  const isVerified = !!localStorage.getItem("verifiedUser");

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Universal Navigation */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-grow pt-20">
          <Routes>
            {/* Default route */}
            <Route path="/" element={<Home />} />

            {/* Verification route */}
            <Route
              path="/verify"
              element={
                isVerified ? <Navigate to="/dashboard" /> : <VerificationForm />
              }
            />

            {/* Dashboard - Protected */}
            <Route
              path="/dashboard"
              element={
                isVerified ? <Dashboard /> : <Navigate to="/verify" replace />
              }
            />

            {/* --- Forms --- */}
            <Route
              path="/forms/resident-certificate"
              element={
                isVerified ? (
                  <ResidentCertificateForm />
                ) : (
                  <Navigate to="/verify" replace />
                )
              }
            />
            <Route
              path="/forms/business-permit"
              element={
                isVerified ? (
                  <BusinessPermitForm />
                ) : (
                  <Navigate to="/verify" replace />
                )
              }
            />
            <Route
              path="/forms/introduction-letter"
              element={
                isVerified ? (
                  <IntroductionLetterForm />
                ) : (
                  <Navigate to="/verify" replace />
                )
              }
            />
            <Route
              path="/forms/community-development"
              element={
                isVerified ? (
                  <CommunityDevelopmentForm />
                ) : (
                  <Navigate to="/verify" replace />
                )
              }
            />

            {/* --- Vibali (Permits) --- */}
            <Route path="/vibali" element={<VibaliMain />} />
            <Route
              path="/vibali/ujenzi"
              element={
                isVerified ? <UjenziPermitForm /> : <Navigate to="/verify" replace />
              }
            />
            <Route
              path="/vibali/mazishi"
              element={
                isVerified ? <MazishiPermitForm /> : <Navigate to="/verify" replace />
              }
            />
            <Route
              path="/vibali/event"
              element={
                isVerified ? (
                  <EventEntertainmentPermitForm />
                ) : (
                  <Navigate to="/verify" replace />
                )
              }
            />
            <Route
              path="/vibali/transportation"
              element={
                isVerified ? (
                  <TransportationPermitForm />
                ) : (
                  <Navigate to="/verify" replace />
                )
              }
            />
            <Route
              path="/vibali/kilimo"
              element={
                isVerified ? (
                  <KilimoUmwagiliajiPermitForm />
                ) : (
                  <Navigate to="/verify" replace />
                )
              }
            />
            <Route
              path="/vibali/usafi"
              element={
                isVerified ? <UsafiPermitForm /> : <Navigate to="/verify" replace />
              }
            />
            <Route
              path="/vibali/mikusanyiko"
              element={
                isVerified ? (
                  <MikusanyikoMikutanoPermitForm />
                ) : (
                  <Navigate to="/verify" replace />
                )
              }
            />

            {/* PDF Test Page */}
            <Route path="/test-pdf" element={<UseGeneratePDFExample />} />

            {/* Fallback 404 */}
            <Route
              path="*"
              element={
                <div className="flex flex-col justify-center items-center text-center py-40">
                  <h1 className="text-5xl font-bold text-primary mb-3">404</h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    Samahani, ukurasa huu haupatikani.
                  </p>
                  <a
                    href="/"
                    className="mt-6 bg-primary text-white px-5 py-2 rounded-lg hover:bg-secondary transition"
                  >
                    Rudi Nyumbani
                  </a>
                </div>
              }
            />
          </Routes>
        </main>

        {/* Universal Footer */}
        <Footer />
      </div>
    </Router>
  );
}
