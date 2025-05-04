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
    <div className="pt-20 px-6 ml-56">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600">
          Manage your account and notification preferences
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
        <div className="space-y-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700"
              value={profileSettings.name}
              onChange={handleChangeProfile}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700"
              value={profileSettings.email}
              onChange={handleChangeProfile}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700"
              value={profileSettings.phone}
              onChange={handleChangeProfile}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Notifications</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-gray-700 text-sm font-medium">
              Email Notifications
            </label>
            <input
              type="checkbox"
              name="emailNotifications"
              className="form-checkbox h-5 w-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
              checked={notificationSettings.emailNotifications}
              onChange={handleChangeNotifications}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-gray-700 text-sm font-medium">
              SMS Notifications
            </label>
            <input
              type="checkbox"
              name="smsNotifications"
              className="form-checkbox h-5 w-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
              checked={notificationSettings.smsNotifications}
              onChange={handleChangeNotifications}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSaveSettings}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
