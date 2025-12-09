import { useState } from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/landing/Header";
import Footer from "./components/landing/Footer";
import HomePage from "./components/pages/HomePage";
import AboutDBT from "./components/pages/AboutDBT";
import Guidelines from "./components/pages/Guidelines";
import Contact from "./components/pages/Contact";
import Helpdesk from "./components/pages/Helpdesk";
import LandingPage from "./components/LandingPage";
import StudentDashboard from "./components/dashboards/StudentDashboard";
import InstitutionDashboard from "./components/dashboards/InstitutionDashboard";
import PanchayatDashboard from "./components/dashboards/PanchayatDashboard";
import AdminDashboard from "./components/dashboards/AdminDashboard";
import StudentLoginPage from "./components/pages/StudentLoginPage";
import InstitutionLoginPage from "./components/pages/InstitutionLoginPage";
import PanchayatLoginPage from "./components/pages/PanchayatLoginPage";
import AdminLoginPage from "./components/pages/AdminLoginPage";
import StudentRegistrationPage from "./components/pages/StudentRegistrationPage";
import InstitutionRegistrationPage from "./components/pages/InstitutionRegistrationPage";
import PanchayatRegistrationPage from "./components/pages/PanchayatRegistrationPage";
import VolunteerPage from "./components/pages/VolunteerPage"; // <--- IMPORT THIS

type PageType =
  | "home"
  | "about"
  | "guidelines"
  | "contact"
  | "helpdesk"
  | "landing"
  | "student"
  | "institution"
  | "panchayat"
  | "admin"
  | "student-login"
  | "institution-login"
  | "panchayat-login"
  | "admin-login"
  | "student-registration"
  | "institution-registration"
  | "panchayat-registration"
  | "volunteer"; // <--- ADD THIS

export default function App() {
  const [currentPage, setCurrentPage] =
    useState<PageType>("home");

  const navigateTo = (page: string) => {
    setCurrentPage(page as PageType);
  };

  const showHeaderFooter = ![
    "student",
    "institution",
    "panchayat",
    "admin",
    "student-login",
    "institution-login",
    "panchayat-login",
    "admin-login",
  ].includes(currentPage);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {showHeaderFooter && (
            <Header onNavigate={navigateTo} />
          )}

          {currentPage === "home" && (
            <HomePage onNavigate={navigateTo} />
          )}
          {currentPage === "about" && (
            <AboutDBT onNavigate={navigateTo} />
          )}
          {currentPage === "guidelines" && <Guidelines />}
          {currentPage === "contact" && <Contact />}
          {currentPage === "helpdesk" && <Helpdesk />}
          
          {/* Volunteer Page Route */}
          {currentPage === "volunteer" && (
            <VolunteerPage onNavigate={navigateTo} />
          )}

          {currentPage === "landing" && (
            <LandingPage onNavigate={navigateTo} />
          )}
          {currentPage === "student" && (
            <StudentDashboard onNavigate={navigateTo} />
          )}
          {currentPage === "institution" && (
            <InstitutionDashboard onNavigate={navigateTo} />
          )}
          {currentPage === "panchayat" && (
            <PanchayatDashboard onNavigate={navigateTo} />
          )}
          {currentPage === "admin" && (
            <AdminDashboard onNavigate={navigateTo} />
          )}
          {currentPage === "student-login" && (
            <StudentLoginPage onLoginSuccess={() => navigateTo("student")} onBack={() => navigateTo("landing")} onNavigate={navigateTo} />
          )}
          {currentPage === "institution-login" && (
            <InstitutionLoginPage onLoginSuccess={() => navigateTo("institution")} onBack={() => navigateTo("landing")} onNavigate={navigateTo} />
          )}
          {currentPage === "panchayat-login" && (
            <PanchayatLoginPage onLoginSuccess={() => navigateTo("panchayat")} onBack={() => navigateTo("landing")} onNavigate={navigateTo} />
          )}
          {currentPage === "admin-login" && (
            <AdminLoginPage onLoginSuccess={() => navigateTo("admin")} onBack={() => navigateTo("landing")} />
          )}
          {currentPage === "student-registration" && (
            <StudentRegistrationPage />
          )}
          {currentPage === "institution-registration" && (
            <InstitutionRegistrationPage />
          )}
          {currentPage === "panchayat-registration" && (
            <PanchayatRegistrationPage />
          )}

          {showHeaderFooter && <Footer />}
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}