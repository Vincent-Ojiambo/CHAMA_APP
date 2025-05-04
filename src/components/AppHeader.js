// App Header Component
import React from "react"; // Make sure to import React
import { User, Bell } from "lucide-react"; // Import the specific icons you are using

function AppHeader({ onLogout }) {
  return (
    <header className="bg-green-600 text-white h-16 fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-6">
      <div className="text-2xl font-bold">ChamaPlus</div>
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
      </div>
    </header>
  );
}

export default AppHeader; // Add the default export
