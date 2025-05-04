// import React from "react";
// import {
//   Briefcase,
//   Wallet,
//   Calendar,
//   Users,
//   Coins,
//   PlusCircle,
//   DollarSign,
// } from "lucide-react";
// import StatCard from "../components/StatCard"; // Adjust path if needed

// function DashboardPage() {
//   const overviewStats = [
//     { icon: <Briefcase />, title: "Active Chamas", value: "3" },
//     { icon: <Users />, title: "Total Members", value: "35" },
//     { icon: <Coins />, title: "Total Funds", value: "KSH 25,000" },
//     { icon: <Calendar />, title: "Upcoming Meetings", value: "2" },
//   ];

//   const recentActivities = [
//     {
//       type: "Contribution Received",
//       details: "Mwanzo Chama - KSH 2,000",
//       time: "Today",
//     },
//     {
//       type: "Loan Approved",
//       details: "Ujenzi Chama - KSH 15,000",
//       time: "Yesterday",
//     },
//     {
//       type: "Meeting Scheduled",
//       details: "Mwanzo Chama - May 5, 2025",
//       time: "2 days ago",
//     },
//   ];

//   const quickActions = [
//     {
//       label: "Create New Chama",
//       icon: <PlusCircle />,
//       onClick: () => alert("Navigate to create chama"),
//     }, // Replace with actual navigation
//     {
//       label: "View My Chamas",
//       icon: <Briefcase />,
//       onClick: () => alert("Navigate to my chamas"),
//     }, // Replace with actual navigation
//     {
//       label: "Apply for a Loan",
//       icon: <DollarSign />,
//       onClick: () => alert("Navigate to loans"),
//     }, // DollarSign is used here
//     {
//       label: "Schedule Meeting",
//       icon: <Calendar />,
//       onClick: () => alert("Navigate to meetings"),
//     }, // Replace with actual navigation
//   ];

//   const chamaStats = [
//     { title: "Mwanzo Chama", totalFunds: "KSH 145,000", members: "12" },
//     { title: "Ujenzi Chama", totalFunds: "KSH 98,000", members: "8" },
//     { title: "Savings Group C", totalFunds: "KSH 62,000", members: "15" },
//   ];

//   return (
//     <div className="pt-20 px-6 ml-56">
//       <h1 className="text-2xl font-bold text-gray-800 mb-4">
//         Dashboard Overview
//       </h1>

//       {/* Overview Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {overviewStats.map((stat, index) => (
//           <StatCard
//             key={index}
//             icon={stat.icon}
//             title={stat.title}
//             value={stat.value}
//           />
//         ))}
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-lg shadow p-6 mb-8">
//         <h2 className="text-lg font-semibold text-gray-700 mb-4">
//           Quick Actions
//         </h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {quickActions.map((action, index) => (
//             <button
//               key={index}
//               onClick={action.onClick}
//               className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-md"
//             >
//               <span className="mr-2">{action.icon}</span>{" "}
//               {/* DollarSign should render here */}
//               {action.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Recent Activities */}
//       <div className="bg-white rounded-lg shadow p-6 mb-8">
//         <h2 className="text-lg font-semibold text-gray-700 mb-4">
//           Recent Activities
//         </h2>
//         <div className="space-y-4">
//           {recentActivities.map((activity, index) => (
//             <div key={index} className="flex justify-between items-center">
//               <div>
//                 <h3 className="font-medium text-gray-800">{activity.type}</h3>
//                 <p className="text-gray-600 text-sm">{activity.details}</p>
//               </div>
//               <span className="text-gray-500 text-sm">{activity.time}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chama Statistics */}
//       <div className="bg-white rounded-lg shadow p-6 mb-8">
//         <h2 className="text-lg font-semibold text-gray-700 mb-4">
//           Chama Statistics
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {chamaStats.map((chama, index) => (
//             <div key={index} className="border rounded-md p-4">
//               <h3 className="font-semibold text-gray-800">{chama.title}</h3>
//               <p className="text-gray-600 text-sm">
//                 Total Funds: {chama.totalFunds}
//               </p>
//               <p className="text-gray-600 text-sm">Members: {chama.members}</p>
//               <button className="mt-2 text-green-600 hover:text-green-800 text-sm">
//                 View Details
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Further sections can be added here (e.g., Loan Overview, Contribution Summary) */}
//     </div>
//   );
// }

// export default DashboardPage;

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
      onClick: () => alert("Navigate to create chama"),
    }, // Replace with actual navigation
    {
      label: "View My Chamas",
      icon: <Briefcase />,
      onClick: () => alert("Navigate to my chamas"),
    }, // Replace with actual navigation
    {
      label: "Apply for a Loan",
      icon: <DollarSign />,
      onClick: () => alert("Navigate to loans"),
    }, // DollarSign is used here
    {
      label: "Schedule Meeting",
      icon: <Calendar />,
      onClick: () => alert("Navigate to meetings"),
    }, // Replace with actual navigation
  ];

  const chamaStats = [
    { title: "Mwanzo Chama", totalFunds: "KSH 145,000", members: "12" },
    { title: "Ujenzi Chama", totalFunds: "KSH 98,000", members: "8" },
    { title: "Savings Group C", totalFunds: "KSH 62,000", members: "15" },
  ];

  return (
    <div className="pt-20 px-6 ml-56 bg-blue-100 min-h-screen">
      {" "}
      {/* Added blue background */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Dashboard Overview
      </h1>
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {overviewStats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-md"
            >
              <span className="mr-2">{action.icon}</span>{" "}
              {/* DollarSign should render here */}
              {action.label}
            </button>
          ))}
        </div>
      </div>
      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Recent Activities
        </h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-800">{activity.type}</h3>
                <p className="text-gray-600 text-sm">{activity.details}</p>
              </div>
              <span className="text-gray-500 text-sm">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Chama Statistics */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Chama Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chamaStats.map((chama, index) => (
            <div key={index} className="border rounded-md p-4">
              <h3 className="font-semibold text-gray-800">{chama.title}</h3>
              <p className="text-gray-600 text-sm">
                Total Funds: {chama.totalFunds}
              </p>
              <p className="text-gray-600 text-sm">Members: {chama.members}</p>
              <button className="mt-2 text-green-600 hover:text-green-800 text-sm">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Further sections can be added here (e.g., Loan Overview, Contribution Summary) */}
    </div>
  );
}

export default DashboardPage;
