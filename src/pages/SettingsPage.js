import React, { useState } from "react";

function SettingsPage() {
  const [profileSettings, setProfileSettings] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+254 700 000 000",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
  });

  const handleChangeProfile = (e) => {
    const { name, value } = e.target;
    setProfileSettings((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeNotifications = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSaveSettings = () => {
    // In a real application, you would send these settings to your backend
    console.log("Profile Settings Saved:", profileSettings);
    console.log("Notification Settings Saved:", notificationSettings);
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-100 p-4 pt-20">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg">Settings</h1>
          <p className="text-lg text-blue-50">Manage your account and notification preferences</p>
        </div>

        {/* Profile Information Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Profile Information</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileSettings.name}
                onChange={handleChangeProfile}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileSettings.email}
                onChange={handleChangeProfile}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profileSettings.phone}
                onChange={handleChangeProfile}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Notification Preferences</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">Email Notifications</label>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={notificationSettings.emailNotifications}
                onChange={handleChangeNotifications}
                className="form-checkbox h-6 w-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">SMS Notifications</label>
              <input
                type="checkbox"
                name="smsNotifications"
                checked={notificationSettings.smsNotifications}
                onChange={handleChangeNotifications}
                className="form-checkbox h-6 w-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveSettings}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
