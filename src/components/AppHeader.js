// // App Header Component
// import React from "react"; // Make sure to import React
// import { User, Bell } from "lucide-react"; // Import the specific icons you are using

// function AppHeader({ onLogout }) {
//   return (
//     <header className="bg-green-600 text-white h-16 fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-6">
//       <div className="text-2xl font-bold">ChamaPlus</div>
//       <div className="flex items-center space-x-4">
//         <Bell size={20} />
//         <div className="flex items-center">
//           <div className="mr-2 text-right">
//             <div className="text-sm">Vincent Ojiambo</div>
//           </div>
//           <div className="bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center">
//             <User size={16} />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default AppHeader; // Add the default export

// import React from "react";
// import { Bell, User } from "lucide-react";

// interface AppHeaderProps {
//   onLogout?: () => void;
//   logoUrl?: string;
// }

// const AppHeader: React.FC<AppHeaderProps> = ({
//   onLogout,
//   logoUrl = "/logo512.png",
// }) => {
//   return (
//     <header className="bg-green-600 text-white h-16 fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-6 shadow-md">
//       <div className="flex items-center">
//         <img
//           src={logoUrl}
//           alt="ChamaPlus Logo"
//           className="mr-2 h-10 w-10 rounded-full" // Increased size to h-10 w-10 (40px x 40px)
//         />
//         <div className="text-2xl font-bold">ChamaPlus</div>
//       </div>
//       <div className="flex items-center space-x-4">
//         <Bell size={20} />
//         <div className="flex items-center">
//           <div className="mr-2 text-right">
//             <div className="text-sm">Vincent Ojiambo</div>
//           </div>
//           <div className="bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center">
//             <User size={16} />
//           </div>
//         </div>
//         {onLogout && (
//           <button
//             onClick={onLogout}
//             className="ml-4 text-sm hover:text-gray-200 transition-colors"
//           >
//             Logout
//           </button>
//         )}
//       </div>
//     </header>
//   );
// };

// export default AppHeader;

import React from "react";
import { Bell, User } from "lucide-react";

/**
 * Props for the AppHeader component.
 */
interface AppHeaderProps {
  /**
   * Function to call when the user clicks the logout button.
   */
  onLogout?: () => void;
  /**
   * URL of the logo image.
   * @default "/logo512.png"
   */
  logoUrl?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  onLogout,
  logoUrl = "/logo512.png",
}) => {
  return (
    <header className="bg-green-600 text-white h-16 fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-6 shadow-md">
      <div className="flex items-center">
        <img
          src={logoUrl}
          alt="ChamaPlus Logo"
          className="mr-2 h-10 w-10 rounded-full"
        />
        <div className="text-2xl font-bold">ChamaPlus</div>
      </div>
      <div className="flex items-center space-x-4">
        <Bell size={20} />
        <div className="flex items-center">
          <div className="mr-2 text-right">
            <div className="text-sm">Vincent Ojiambo</div>
          </div>
          <div className="bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center">
            <User size={16} />
          </div>
        </div>
        {onLogout && (
          <button
            onClick={onLogout}
            className="ml-4 text-sm hover:text-gray-200 transition-colors"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
