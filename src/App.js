import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";

import {
  Home,
  User,
  Briefcase,
  Wallet,
  Calendar,
  BarChart2,
  Settings,
  LogOut,
  ChevronRight,
  DollarSign,
  Award,
  Bell,
} from "lucide-react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import MyChamasPage from "./pages/MyChamasPage";
import ContributionsPage from "./pages/ContributionsPage";
import ReportsPage from "./pages/ReportsPage";
import AppHeader from "./components/AppHeader";
import Sidebar from "./components/Sidebar";
import LoansPage from "./pages/LoansPage";
import MeetingsPage from "./pages/MeetingsPage";
import SettingsPage from "./pages/SettingsPage";
import LoadingSpinner from "./components/LoadingSpinner";

export default function ChamaPlusApp() {
  const [currentPage, setCurrentPage] = useState("login");
  const [showRegisterPage, setShowRegisterPage] = useState(false);
  const [sidebarMinimized, setSidebarMinimized] = useState(false); // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile sidebar
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  // Navigation handler
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // Listen for quick action navigation events from DashboardPage
  useEffect(() => {
    const handler = (e) => {
      if (e.detail) {
        setCurrentPage(e.detail);
      }
    };
    window.addEventListener("navigateTo", handler);
    return () => window.removeEventListener("navigateTo", handler);
  }, []);

  // Function to show the registration page
  const goToRegister = () => {
    setShowRegisterPage(true);
  };

  // Render the appropriate page based on state
  const renderPage = () => {
    if (isLoading) {
      return <LoadingSpinner fullScreen />;
    }

    if (!isAuthenticated) {
      if (showRegisterPage) {
        return (
          <RegisterPage onBackToLogin={() => setShowRegisterPage(false)} />
        );
      } else {
        return <LoginPage onGoToRegister={goToRegister} />;
      }
    }

    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />;
      case "my-chamas":
        return <MyChamasPage />;
      case "contributions":
        return <ContributionsPage />;
      case "reports":
        return <ReportsPage />;
      case "loans":
        return <LoansPage />;
      case "meetings":
        return <MeetingsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="font-sans min-h-screen bg-gray-50">
      {isAuthenticated && (
        <AppHeader 
          onMenuClick={() => setSidebarOpen(true)}
        />
      )}

      {/* Mobile Sidebar Overlay */}
      {isAuthenticated && (
        <div className={`fixed inset-0 z-40 md:hidden transition-all ${sidebarOpen ? 'block' : 'hidden'}`}> 
          <div className="absolute inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
          <Sidebar
            currentPage={currentPage}
            navigateTo={(page) => { setSidebarOpen(false); navigateTo(page); }}
            onLogout={logout}
            minimized={false}
            setMinimized={() => {}}
            mobile
          />
          <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 z-50 bg-white rounded-full p-2 shadow-md hover:bg-blue-50 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      )}

      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        {isAuthenticated && (
          <Sidebar
            currentPage={currentPage}
            navigateTo={navigateTo}
            onLogout={logout}
            minimized={sidebarMinimized}
            setMinimized={setSidebarMinimized}
            className="hidden md:flex"
          />
        )}

        <main
          className={`flex-1 overflow-auto transition-all duration-300 ${sidebarMinimized ? 'md:ml-20' : 'md:ml-56'}`}
        >
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
