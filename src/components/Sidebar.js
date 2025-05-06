import React from "react";
import {
  Home,
  Briefcase,
  Wallet,
  Calendar,
  BarChart2,
  Settings,
  LogOut,
  DollarSign,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Sidebar({ currentPage, navigateTo, onLogout, minimized, setMinimized, mobile = false, className = "" }) {
  const menuItems = [
    { name: "dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { name: "my-chamas", label: "My Chamas", icon: <Briefcase size={20} /> },
    {
      name: "contributions",
      label: "Contributions",
      icon: <Wallet size={20} />,
    },
    { name: "loans", label: "Loans", icon: <DollarSign size={20} /> },
    { name: "meetings", label: "Meetings", icon: <Calendar size={20} /> },
    { name: "reports", label: "Reports", icon: <BarChart2 size={20} /> },
    { name: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside
      className={`flex flex-col ${mobile ? "w-56 h-full bg-gradient-to-b from-green-400 via-blue-300 to-purple-300 border-none fixed left-0 top-0 bottom-0 pt-16 z-50 shadow-2xl transition-transform duration-300 animate-slide-in" : `${minimized ? "w-20" : "w-56"} bg-gradient-to-b from-green-100 via-blue-50 to-purple-50 border-r border-gray-200 fixed left-0 top-16 bottom-0 pt-6 rounded-tr-3xl shadow-xl z-20 transition-all duration-300`} ${className}`}
      style={mobile ? { borderRadius: '0 1.5rem 1.5rem 0', boxShadow: '0 0 40px 0 rgba(80,80,180,0.12)' } : {}}
    >
      {/* Minimize/Expand Button (hidden on mobile) */}
      {!mobile && (
        <button
          aria-label={minimized ? "Expand sidebar" : "Minimize sidebar"}
          onClick={() => setMinimized(!minimized)}
          className="absolute -right-4 top-8 bg-white shadow-lg rounded-full p-1 border border-gray-200 hover:bg-blue-50 transition-all z-30"
        >
          {minimized ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      )}
      {/* Mobile Header */}
      {mobile && (
        <div className="flex items-center justify-start px-6 py-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-tr-2xl shadow-md mb-4">
          <img src="/logo512.png" alt="ChamaPlus Logo" className="h-10 w-10 rounded-full border-2 border-white shadow mr-3" />
          <span className="text-xl font-extrabold text-white tracking-wide drop-shadow">ChamaPlus</span>
        </div>
      )}
      <nav className={`flex-1 ${mobile ? "mt-2" : "mt-8"}`}>
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => navigateTo(item.name)}
                className={`flex items-center ${minimized && !mobile ? "justify-center px-0" : "px-6 justify-start"} py-3 w-full text-left rounded-2xl transition-all duration-150 group focus:outline-none focus:ring-2 focus:ring-green-300
                  ${
                    currentPage === item.name
                      ? "bg-gradient-to-r from-green-200 via-blue-100 to-purple-100 text-green-700 font-bold shadow-lg border-l-4 border-green-500"
                      : mobile
                        ? "text-white/90 hover:bg-white/10 hover:text-white"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  }
                `}
              >
                <span className={`text-xl group-hover:scale-110 transition-transform ${currentPage === item.name ? (mobile ? "text-white" : "text-green-700") : (mobile ? "text-white/70" : "text-gray-400")}`}>{item.icon}</span>
                {(!minimized || mobile) && <span className="truncate ml-3 text-base font-semibold">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pb-6 px-6">
        <button
          onClick={onLogout}
          className={`flex items-center w-full justify-center py-3 text-white font-bold rounded-xl bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 shadow-lg hover:scale-105 hover:from-red-500 hover:to-purple-500 transition-all focus:outline-none focus:ring-2 focus:ring-red-200`}
        >
          <span className="text-xl">
            <LogOut size={20} />
          </span>
          {(!minimized || mobile) && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
