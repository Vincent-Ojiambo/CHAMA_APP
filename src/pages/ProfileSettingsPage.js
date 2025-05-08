import React from 'react';
import { Settings, User, Phone, Mail, Lock, Globe, CreditCard } from 'lucide-react';

const ProfileSettingsPage = () => {
  const [profile, setProfile] = React.useState({
    name: 'Vincent Ojiambo',
    email: 'vincent@example.com',
    phone: '+254 722 123 456',
    password: '',
    newPassword: '',
    confirmPassword: '',
    language: 'English',
    currency: 'KSH',
    timezone: 'Africa/Nairobi',
    notifications: true,
    darkMode: false,
    autoLogin: true,
    showTips: true,
    updateFrequency: 'weekly',
    theme: 'system',
    notificationSound: true,
    notificationVibration: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    alert('Profile settings saved!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-100 p-4 pt-20">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Save Changes
          </button>
        </div>

        <div className="space-y-6">
          {/* Profile Information */}
          <div className="bg-blue-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline-block mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline-block mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline-block mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-blue-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Security Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Lock className="w-4 h-4 inline-block mr-2" />
                  Current Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={profile.password}
                  onChange={handleInputChange}
                  placeholder="Enter current password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Lock className="w-4 h-4 inline-block mr-2" />
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={profile.newPassword}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Lock className="w-4 h-4 inline-block mr-2" />
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={profile.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="autoLogin"
                  checked={profile.autoLogin}
                  onChange={handleInputChange}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <label className="text-sm text-gray-700">Enable auto-login</label>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-blue-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Globe className="w-4 h-4 inline-block mr-2" />
                  Language
                </label>
                <select
                  name="language"
                  value={profile.language}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="English">English</option>
                  <option value="Swahili">Swahili</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CreditCard className="w-4 h-4 inline-block mr-2" />
                  Currency
                </label>
                <select
                  name="currency"
                  value={profile.currency}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="KSH">Kenyan Shilling (KSH)</option>
                  <option value="USD">US Dollar (USD)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline-block mr-2" />
                  Update Frequency
                </label>
                <select
                  name="updateFrequency"
                  value={profile.updateFrequency}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="darkMode"
                  checked={profile.darkMode}
                  onChange={handleInputChange}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <label className="text-sm text-gray-700">Enable dark mode</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="showTips"
                  checked={profile.showTips}
                  onChange={handleInputChange}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <label className="text-sm text-gray-700">Show tips on startup</label>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-blue-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Notification Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={profile.notifications}
                  onChange={handleInputChange}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <label className="text-sm text-gray-700">Enable notifications</label>
              </div>
              <div className="ml-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="notificationSound"
                    checked={profile.notificationSound}
                    onChange={handleInputChange}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <label className="text-sm text-gray-700">Play sound</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="notificationVibration"
                    checked={profile.notificationVibration}
                    onChange={handleInputChange}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <label className="text-sm text-gray-700">Vibrate</label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline-block mr-2" />
                  Theme
                </label>
                <select
                  name="theme"
                  value={profile.theme}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="system">System Default</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
