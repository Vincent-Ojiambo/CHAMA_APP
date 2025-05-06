import React from "react";
import { Bell, User } from "lucide-react";

/**
 * Props for the AppHeader component.
 */
interface AppHeaderProps {
  /**
   * URL of the logo image.
   * @default "/logo512.png"
   */
  logoUrl?: string;
  /**
   * Callback function to handle menu click.
   */
  onMenuClick: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  logoUrl = "/logo512.png",
  onMenuClick,
}) => {
  return (
    <header className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-white h-16 fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 sm:px-6 shadow-lg rounded-lg">
      {/* Mobile menu button */}
      <button
        className="md:hidden mr-2 p-2 rounded-full bg-white/20 hover:bg-blue-200/30 focus:outline-none focus:ring-2 focus:ring-white"
        onClick={onMenuClick}
        aria-label="Open sidebar menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      <div className="flex items-center min-w-0">
        <img
          src={logoUrl}
          alt="ChamaPlus Logo"
          className="mr-2 h-10 w-10 rounded-full object-cover border-2 border-white shadow"
        />
        <div className="truncate text-xl sm:text-2xl font-extrabold drop-shadow-lg tracking-wide">ChamaPlus</div>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button className="p-2 rounded-full hover:bg-blue-200/30 hover:text-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white">
          <Bell size={20} />
        </button>
        <div className="flex items-center">
          <div className="mr-2 text-right hidden sm:block">
            <div className="text-xs sm:text-sm truncate max-w-[80px] font-semibold text-white/90 drop-shadow">Vincent Ojiambo</div>
          </div>
          <div className="bg-white/20 rounded-full h-8 w-8 flex items-center justify-center shadow">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
