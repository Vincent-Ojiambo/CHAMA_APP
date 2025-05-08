import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { WebSocketProvider } from "./context/WebSocketContext";

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
import ChamaDetailsPage from "./pages/ChamaDetailsPage";
import LoanDetailsPage from "./pages/LoanDetailsPage";
import MeetingDetailsPage from "./pages/MeetingDetailsPage";

export default function ChamaPlusApp() {
  const [currentPage, setCurrentPage] = useState("login");
  const [showRegisterPage, setShowRegisterPage] = useState(false);
  const [sidebarMinimized, setSidebarMinimized] = useState(false); // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile sidebar
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !user) {
      // If authenticated but no user data, try to fetch it
      const fetchUserData = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/auth/verify', {
            credentials: 'include',
          });
          
          if (!response.ok) {
            throw new Error('Failed to verify authentication');
          }

          const data = await response.json();
          if (data.success && data.user) {
            // Update user data in auth context
            // This would typically be handled by your auth context
            console.log('User data verified:', data.user);
          }
        } catch (error) {
          console.error('Error verifying user:', error);
          // Handle error (e.g., redirect to login)
        }
      };

      fetchUserData();
    }
  }, [isAuthenticated]);

  // Set dashboard as default page when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setCurrentPage("dashboard");
    }
  }, [isAuthenticated]);

  // Navigation handler
  const navigateTo = (pageOrObj) => {
    if (typeof pageOrObj === "object" && pageOrObj.page === "chama-details") {
      setCurrentPage({ page: "chama-details", chama: pageOrObj.chama });
    } else if (typeof pageOrObj === "object" && pageOrObj.page === "loan-details") {
      setCurrentPage({ page: "loan-details", loan: pageOrObj.loan });
    } else {
      setCurrentPage(pageOrObj);
    }
  };

  // Listen for quick action navigation events from DashboardPage and MyChamasPage
  useEffect(() => {
    const handler = (e) => {
      if (e.detail) {
        if (typeof e.detail === "object" && e.detail.page === "chama-details") {
          setCurrentPage({ page: "chama-details", chama: e.detail.chama });
        } else if (typeof e.detail === "object" && e.detail.page === "loan-details") {
          setCurrentPage({ page: "loan-details", loan: e.detail.loan });
        } else {
          setCurrentPage(e.detail);
        }
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

    if (typeof currentPage === "object" && currentPage.page === "chama-details") {
      return <ChamaDetailsPage chama={currentPage.chama} hidePersonal={currentPage.hidePersonal} />;
    }
    if (typeof currentPage === "object" && currentPage.page === "loan-details") {
      return <LoanDetailsPage loan={currentPage.loan} onBack={() => setCurrentPage("loans")} />;
    }
    if (typeof currentPage === "object" && currentPage.page === "meeting-details") {
      return <MeetingDetailsPage meeting={currentPage.meeting} onBack={() => setCurrentPage("meetings")} />;
    }

    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />;
      case "my-chamas":
        return <MyChamasPage />;
      case "contributions":
        return <ContributionsPage />;
      case "loans":
        return <LoansPage />;
      case "meetings":
        return <MeetingsPage />;
      case "reports":
        return <ReportsPage />;
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
    <WebSocketProvider>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        {isAuthenticated && (
          <AppHeader 
            onMenuClick={() => setSidebarOpen(true)}
          onNavigateToActivityLog={() => navigateTo('activity-log')}
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

      <div className="flex h-full w-full">
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
          className={`flex-1 h-full w-full overflow-auto transition-all duration-300 ${sidebarMinimized ? 'md:ml-20' : 'md:ml-56'}`}
        >
          {renderPage()}
        </main>
      </div>
    </div>
    </WebSocketProvider>
  );
}
