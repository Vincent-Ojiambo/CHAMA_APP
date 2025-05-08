import React, { useState } from "react";
import { Bell, User, Settings, Mail, Clock, LogOut } from "lucide-react";

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
  /**
   * Callback function to handle logout.
   */
  onLogout: () => void;
  /**
   * Callback function to navigate to settings.
   */
  onNavigateToSettings: () => void;
  /**
   * Callback function to navigate to notifications.
   */
  onNavigateToNotifications: () => void;
  /**
   * Callback function to navigate to activity log.
   */
  onNavigateToActivityLog: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  logoUrl = "/logo512.png",
  onMenuClick,
  onLogout,
  onNavigateToSettings,
  onNavigateToNotifications,
  onNavigateToActivityLog,
}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Contribution",
      message: "Your monthly contribution has been successfully processed.",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Meeting Reminder",
      message: "Chama meeting scheduled for tomorrow at 7:00 PM.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "Loan Approval",
      message: "Your loan application has been approved.",
      time: "1 day ago",
      read: true,
    },
  ]);

  const handleLogout = () => {
    onLogout();
    setIsProfileMenuOpen(false);
  };

  const handleNavigate = (page) => {
    window.dispatchEvent(new CustomEvent('navigateTo', { detail: page }));
    setIsProfileMenuOpen(false);
  };

  const handleNavigateToSettings = () => handleNavigate('settings');
  const handleNavigateToNotifications = () => handleNavigate('notifications');
  const handleNavigateToActivityLog = () => handleNavigate('activity-log');

  // Handle outside click
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileMenuOpen && !event.target.closest('.profile-menu')) {
        setIsProfileMenuOpen(false);
      }
      if (isNotificationsOpen && !event.target.closest('.notifications')) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileMenuOpen, isNotificationsOpen]);

  // Handle outside click
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileMenuOpen && !event.target.closest('.profile-menu') && !event.target.closest('.notifications')) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  const handleNotificationClick = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  const handleDeleteNotification = (notificationId) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== notificationId));
  };
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
      <div className="flex items-center space-x-2 sm:space-x-4 relative">
        {/* Notifications */}
        <div className="relative">
          <button
            className="p-2 rounded-full hover:bg-blue-200/30 hover:text-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white relative notifications"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          >
            <Bell size={20} />
            {notifications.filter((notif) => !notif.read).length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.filter((notif) => !notif.read).length}
              </span>
            )}
          </button>
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg overflow-hidden z-50 notifications-menu">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
                    {notifications.filter((notif) => !notif.read).length > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {notifications.filter((notif) => !notif.read).length}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {notifications.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b last:border-0 cursor-pointer hover:bg-gray-50 transition-colors ${
                        notification.read ? 'bg-gray-50' : 'bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{notification.title}</h4>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {notification.time}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteNotification(notification.id);
                            }}
                            className="text-gray-500 hover:text-red-500 focus:outline-none"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div className="flex items-center">
          <div className="mr-2 text-right hidden sm:block">
            <div className="text-xs sm:text-sm truncate max-w-[80px] font-semibold text-white/90 drop-shadow">Vincent Ojiambo</div>
          </div>
          <div className="bg-white/20 rounded-full h-8 w-8 flex items-center justify-center shadow relative profile-icon" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
            <User size={16} />
          </div>
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden z-50 profile-menu">
              <div className="p-2">
                <div className="px-3 py-2 border-b">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Vincent Ojiambo</h4>
                      <p className="text-sm text-gray-500">Member</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <button
                    onClick={handleNavigateToSettings}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors flex items-center space-x-2"
                  >
                    <Settings size={16} />
                    <span>Profile Settings</span>
                  </button>
                  <button
                    onClick={handleNavigateToNotifications}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors flex items-center space-x-2"
                  >
                    <Mail size={16} />
                    <span>Notifications</span>
                  </button>
                  <button
                    onClick={handleNavigateToActivityLog}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors flex items-center space-x-2"
                  >
                    <Clock size={16} />
                    <span>Activity Log</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 focus:outline-none focus:bg-red-50 transition-colors flex items-center space-x-2"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
