// import React from "react"; // Import React
// import {
//   Home,
//   Briefcase,
//   Wallet,
//   DollarSign,
//   Calendar,
//   BarChart2,
//   Settings,
//   LogOut,
// } from "lucide-react"; // Import the specific icons

// function Sidebar({ currentPage, navigateTo, onLogout }) {
//   const menuItems = [
//     { name: "dashboard", label: "Dashboard", icon: <Home size={20} /> },
//     { name: "my-chamas", label: "My Chamas", icon: <Briefcase size={20} /> },
//     {
//       name: "contributions",
//       label: "Contributions",
//       icon: <Wallet size={20} />,
//     },
//     { name: "loans", label: "Loans", icon: <DollarSign size={20} /> },
//     { name: "meetings", label: "Meetings", icon: <Calendar size={20} /> },
//     { name: "reports", label: "Reports", icon: <BarChart2 size={20} /> },
//     { name: "settings", label: "Settings", icon: <Settings size={20} /> },
//   ];

//   return (
//     <aside className="w-56 bg-white border-r border-gray-200 fixed left-0 top-16 bottom-0 pt-4">
//       <nav>
//         <ul>
//           {menuItems.map((item) => (
//             <li key={item.name}>
//               <button
//                 onClick={() => navigateTo(item.name)}
//                 className={`flex items-center px-6 py-3 w-full text-left ${
//                   currentPage === item.name
//                     ? "bg-green-50 text-green-600 font-medium border-l-4 border-green-600"
//                     : "text-gray-700 hover:bg-gray-50"
//                 }`}
//               >
//                 <span className="mr-3">{item.icon}</span>
//                 {item.label}
//               </button>
//             </li>
//           ))}
//           <li className="absolute bottom-4 w-full">
//             <button
//               onClick={onLogout}
//               className="flex items-center px-6 py-3 w-full text-left text-gray-700 hover:bg-gray-50"
//             >
//               <span className="mr-3">
//                 <LogOut size={20} />
//               </span>
//               Logout
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </aside>
//   );
// }

// export default Sidebar; // Add the default export

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
} from "lucide-react";

function Sidebar({ currentPage, navigateTo, onLogout }) {
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
    <aside className="w-56 bg-white border-r border-gray-200 fixed left-0 top-16 bottom-0 pt-4">
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => navigateTo(item.name)}
                className={`flex items-center px-6 py-3 w-full text-left ${
                  currentPage === item.name
                    ? "bg-green-50 text-green-600 font-medium border-l-4 border-green-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
          <li className="absolute bottom-4 w-full">
            <button
              onClick={onLogout}
              className="flex items-center px-6 py-3 w-full text-left text-gray-700 hover:bg-gray-50"
            >
              <span className="mr-3">
                <LogOut size={20} />
              </span>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
