import React from "react";
import {
  Briefcase,
  Wallet,
  Calendar,
  Users,
  Coins,
  PlusCircle,
  DollarSign,
} from "lucide-react";
import StatCard from "../components/StatCard"; // Adjust path if needed

function DashboardPage() {
  const overviewStats = [
    { icon: <Briefcase />, title: "Active Chamas", value: "3" },
    { icon: <Users />, title: "Total Members", value: "35" },
    { icon: <Coins />, title: "Total Funds", value: "KSH 25,000" },
    { icon: <Calendar />, title: "Upcoming Meetings", value: "2" },
  ];

  const recentActivities = [
    {
      type: "Contribution Received",
      details: "Mwanzo Chama - KSH 2,000",
      time: "Today",
    },
    {
      type: "Loan Approved",
      details: "Ujenzi Chama - KSH 15,000",
      time: "Yesterday",
    },
    {
      type: "Meeting Scheduled",
      details: "Mwanzo Chama - May 5, 2025",
      time: "2 days ago",
    },
  ];

  const quickActions = [
    {
      label: "Create New Chama",
      icon: <PlusCircle />,
    },
    {
      label: "View My Chamas",
      icon: <Briefcase />,
    },
    {
      label: "Apply for a Loan",
      icon: <DollarSign />,
    },
    {
      label: "Schedule Meeting",
      icon: <Calendar />,
    },
  ];

  const chamaStats = [
    { title: "Mwanzo Chama", totalFunds: "KSH 145,000", members: "12", description: "This is a savings group.", created: "January 1, 2022" },
    { title: "Ujenzi Chama", totalFunds: "KSH 98,000", members: "8", description: "This is a construction group.", created: "June 15, 2023" },
    { title: "Savings Group C", totalFunds: "KSH 62,000", members: "15", description: "", created: "N/A" },
  ];

  // Navigation for quick actions
  const handleQuickAction = (action) => {
    switch (action) {
      case "Create New Chama":
        if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent("navigateTo", { detail: "my-chamas" }));
        break;
      case "View My Chamas":
        if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent("navigateTo", { detail: "my-chamas" }));
        break;
      case "Apply for a Loan":
        if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent("navigateTo", { detail: "loans" }));
        break;
      case "Schedule Meeting":
        if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent("navigateTo", { detail: "meetings" }));
        break;
      default:
        break;
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-100">
      <div className="h-full w-full px-4 sm:px-6 lg:px-8 pt-20 space-y-10">
        {/* Hero Welcome Section */}
        <div className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center justify-between mb-6 relative overflow-hidden">
          <div className="z-10 flex-1 w-full">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg">Welcome back, Vincent!</h1>
            <p className="text-lg text-blue-50 mb-4 md:mb-0">Empowering your Chama journey, one step at a time.</p>
          </div>
          {/* Hero Illustration Image with fade from right to center */}
          <div className="relative w-full flex justify-center items-center mt-6 md:mt-0 md:flex-1 md:justify-end">
            <img
              src="/chama.jpg"
              alt="Chama Community"
              className="h-32 md:h-44 lg:h-56 w-auto object-contain rounded-2xl shadow-lg"
              style={{ maskImage: 'linear-gradient(to left, transparent 0%, black 40%)', WebkitMaskImage: 'linear-gradient(to left, transparent 0%, black 40%)' }}
            />
          </div>
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-bl-full z-0" />
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {overviewStats.map((stat, i) => (
            <div key={i} className="bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow group relative overflow-hidden">
              <div className="mb-3 p-3 rounded-full bg-gradient-to-tr from-green-300 via-blue-200 to-purple-200 group-hover:scale-110 transition-transform">
                <span className="text-green-700 text-2xl">{stat.icon}</span>
              </div>
              <div className="font-semibold text-lg text-gray-800">{stat.title}</div>
              <div className="text-2xl font-extrabold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mt-1">{stat.value}</div>
              <div className="absolute right-0 bottom-0 w-10 h-10 bg-white/20 rounded-tl-full z-0" />
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => handleQuickAction(action.label)}
                className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 hover:from-blue-100 hover:via-green-100 hover:to-purple-100 rounded-xl p-6 transition-all shadow group focus:outline-none focus:ring-2 focus:ring-blue-300 hover:scale-105"
              >
                <span className="text-blue-600 mb-2 group-hover:scale-125 transition-transform text-3xl">{action.icon}</span>
                <span className="text-base font-semibold text-gray-800 text-center">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activities Timeline */}
        <div className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-white drop-shadow">Recent Activities</h3>
          <div className="relative">
            <ul className="divide-y divide-blue-100 relative z-10">
              {recentActivities.map((activity, i) => (
                <li
                  key={i}
                  className="py-6 flex items-center space-x-4 group hover:bg-white/20 hover:shadow-2xl transition-all rounded-2xl px-4 relative border-l-4 border-white/30 hover:border-white/60 backdrop-blur-md"
                >
                  <div className="flex-1 min-w-0 ml-0 flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="font-semibold text-white flex items-center gap-3">
                      {/* Icon for each activity type */}
                      {activity.type === 'Contribution Received' && <Coins className="text-blue-200 bg-blue-500/30 rounded-full p-1 w-8 h-8 shadow" />}
                      {activity.type === 'Loan Approved' && <DollarSign className="text-green-200 bg-green-500/30 rounded-full p-1 w-8 h-8 shadow" />}
                      {activity.type === 'Meeting Scheduled' && <Calendar className="text-purple-200 bg-purple-500/30 rounded-full p-1 w-8 h-8 shadow" />}
                      {activity.type === 'New Member Joined' && <Users className="text-yellow-200 bg-yellow-500/30 rounded-full p-1 w-8 h-8 shadow" />}
                      <span className="drop-shadow-lg">{activity.type}</span>
                      {/* Optional badge for new activities */}
                      {i === 0 && (
                        <span className="ml-2 bg-white/90 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full animate-bounce shadow">New</span>
                      )}
                    </div>
                    <div className="text-blue-50 text-sm italic font-light">{activity.details}</div>
                  </div>
                  <div className="text-xs text-blue-100 whitespace-nowrap font-mono ml-2 bg-white/20 px-2 py-1 rounded-full shadow">{activity.time}</div>
                </li>
              ))}
            </ul>
            <div className="flex justify-center mt-8">
              <button className="bg-white/40 hover:bg-white/70 text-blue-800 font-bold px-8 py-3 rounded-full shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-white/60 border-2 border-white/40 backdrop-blur-lg text-lg tracking-wide flex items-center gap-2">
                <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 17l4 4 4-4m0-5V3m0 0H4m16 0h-4' /></svg>
                View All Activities
              </button>
            </div>
          </div>
        </div>

        {/* Chama Statistics */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Chama Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chamaStats.map((chama, index) => (
              <div key={index} className="border border-blue-100 rounded-xl p-6 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 shadow hover:shadow-lg transition-shadow flex flex-col items-start">
                <h3 className="font-semibold text-lg text-gray-800 mb-2 flex items-center gap-2">
                  <Briefcase className="text-blue-400" /> {chama.title}
                </h3>
                {/* Match description and date with user's MyChamasPage data if available */}
                {(() => {
                  const myChamas = JSON.parse(localStorage.getItem('myChamas') || '[]');
                  const match = myChamas.find(c => c.name === chama.title);
                  return (
                    <>
                      <p className="text-gray-600 text-xs mb-1">Description: <span className="font-normal">{(match && match.description) || chama.description || "No description provided."}</span></p>
                      <p className="text-gray-500 text-xs mb-2">Date of Creation: {(match && match.created) || chama.created || "N/A"}</p>
                    </>
                  );
                })()}
                <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">Members: {chama.members}</span>
                <p className="text-gray-600 text-sm mb-4">Total Funds: <span className="font-bold text-blue-700">{chama.totalFunds}</span></p>
                <button 
                  className="mt-auto text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-4 py-2 rounded-lg font-semibold shadow focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
                  onClick={() => {
                    // Find chama details from MyChamasPage data (simulate real data fetch)
                    const myChamas = JSON.parse(localStorage.getItem('myChamas') || '[]');
                    const chamaDetails = myChamas.find(c => c.name === chama.title);
                    if (chamaDetails) {
                      window.dispatchEvent(new CustomEvent("navigateTo", { detail: { page: "chama-details", chama: chamaDetails, hidePersonal: false } }));
                    } else {
                      // Show only chama info, hide personal info
                      window.dispatchEvent(new CustomEvent("navigateTo", { detail: { page: "chama-details", chama: { ...chama, memberList: [] }, hidePersonal: true } }));
                    }
                  }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
