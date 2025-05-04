// import { useState } from "react";
// import {
//   Home,
//   User,
//   Briefcase,
//   Wallet,
//   Calendar,
//   BarChart2,
//   Settings,
//   LogOut,
//   ChevronRight,
//   DollarSign,
//   Award,
//   Bell,
// } from "lucide-react";
// import LoginPage from "./pages/LoginPage";
// import DashboardPage from "./pages/DashboardPage";
// import MyChamasPage from "./pages/MyChamasPage";
// import ContributionsPage from "./pages/ContributionsPage";
// import ReportsPage from "./pages/ReportsPage";
// import AppHeader from "./components/AppHeader";
// import Sidebar from "./components/Sidebar";

// // App Component
// export default function ChamaPlusApp() {
//   const [currentPage, setCurrentPage] = useState("login");
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Login handler
//   const handleLogin = (e) => {
//     e.preventDefault();
//     setIsAuthenticated(true);
//     setCurrentPage("dashboard");
//   };

//   // Logout handler
//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setCurrentPage("login");
//   };

//   // Navigation handler
//   const navigateTo = (page) => {
//     setCurrentPage(page);
//   };

//   // Render the appropriate page based on state
//   const renderPage = () => {
//     if (!isAuthenticated) {
//       return <LoginPage onLogin={handleLogin} />;
//     }

//     switch (currentPage) {
//       case "dashboard":
//         return <DashboardPage />;
//       case "my-chamas":
//         return <MyChamasPage />;
//       case "contributions":
//         return <ContributionsPage />;
//       case "reports":
//         return <ReportsPage />;
//       default:
//         return <DashboardPage />;
//     }
//   };

//   return (
//     <div className="font-sans min-h-screen bg-gray-50">
//       {isAuthenticated && <AppHeader onLogout={handleLogout} />}

//       <div className="flex min-h-screen">
//         {isAuthenticated && (
//           <Sidebar
//             currentPage={currentPage}
//             navigateTo={navigateTo}
//             onLogout={handleLogout}
//           />
//         )}

//         <main className="flex-1">{renderPage()}</main>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
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
import DashboardPage from "./pages/DashboardPage";
import MyChamasPage from "./pages/MyChamasPage";
import ContributionsPage from "./pages/ContributionsPage";
import ReportsPage from "./pages/ReportsPage";
import AppHeader from "./components/AppHeader";
import Sidebar from "./components/Sidebar";
import LoansPage from "./pages/LoansPage";
import MeetingsPage from "./pages/MeetingsPage";
import SettingsPage from "./pages/SettingsPage";

// App Component
export default function ChamaPlusApp() {
  const [currentPage, setCurrentPage] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setCurrentPage("dashboard");
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage("login");
  };

  // Navigation handler
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  // Render the appropriate page based on state
  const renderPage = () => {
    if (!isAuthenticated) {
      return <LoginPage onLogin={handleLogin} />;
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
      case "loans": // Add LoansPage
        return <LoansPage />;
      case "meetings": // Add MeetingsPage
        return <MeetingsPage />;
      case "settings": // Add SettingsPage
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="font-sans min-h-screen bg-gray-50">
      {isAuthenticated && <AppHeader onLogout={handleLogout} />}

      <div className="flex min-h-screen">
        {isAuthenticated && (
          <Sidebar
            currentPage={currentPage}
            navigateTo={navigateTo}
            onLogout={handleLogout}
          />
        )}

        <main className="flex-1">{renderPage()}</main>
      </div>
    </div>
  );
}
