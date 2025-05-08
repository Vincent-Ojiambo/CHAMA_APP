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

  const [appSettings, setAppSettings] = useState({
    currency: 'KSH',
    language: 'en',
    dateFormat: 'DD/MM/YYYY',
    autoUpdate: true,
    showTips: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    passwordProtected: false,
    biometricAuth: false,
    sessionTimeout: 30, // minutes
  });

  const [themeSettings, setThemeSettings] = useState({
    theme: 'light',
    accentColor: '#4338CA',
    font: 'system',
  });

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: false,
    backupFrequency: 'weekly',
    lastBackup: null,
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

  const handleChangeAppSettings = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setAppSettings((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleChangeSecurity = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setSecuritySettings((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleChangeTheme = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setThemeSettings((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleChangeBackup = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setBackupSettings((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSaveSettings = () => {
    // In a real application, you would send these settings to your backend
    console.log("Profile Settings Saved:", profileSettings);
    console.log("Notification Settings Saved:", notificationSettings);
    console.log("App Settings Saved:", appSettings);
    console.log("Security Settings Saved:", securitySettings);
    console.log("Theme Settings Saved:", themeSettings);
    console.log("Backup Settings Saved:", backupSettings);
    alert("Settings saved successfully!");
  };

  const handleBackupNow = () => {
    alert("Backup initiated. Please wait...");
  };

  const handleRestore = () => {
    alert("Restore initiated. Please wait...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-100 p-4 pt-20">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg">Settings</h1>
          <p className="text-lg text-blue-50">Customize your Chama Plus experience</p>
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

        {/* App Preferences Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold mb-6 text-gray-800">App Preferences</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="currency">Currency</label>
              <select
                id="currency"
                name="currency"
                value={appSettings.currency}
                onChange={handleChangeAppSettings}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="KSH">Kenya Shilling (KSH)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="language">Language</label>
              <select
                id="language"
                name="language"
                value={appSettings.language}
                onChange={handleChangeAppSettings}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="en">English</option>
                <option value="sw">Swahili</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="dateFormat">Date Format</label>
              <select
                id="dateFormat"
                name="dateFormat"
                value={appSettings.dateFormat}
                onChange={handleChangeAppSettings}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">Auto Updates</label>
              <input
                type="checkbox"
                name="autoUpdate"
                checked={appSettings.autoUpdate}
                onChange={handleChangeAppSettings}
                className="form-checkbox h-6 w-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">Show Tips</label>
              <input
                type="checkbox"
                name="showTips"
                checked={appSettings.showTips}
                onChange={handleChangeAppSettings}
                className="form-checkbox h-6 w-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
        </div>

        {/* Security Settings Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Security Settings</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">Password Protection</label>
              <input
                type="checkbox"
                name="passwordProtected"
                checked={securitySettings.passwordProtected}
                onChange={handleChangeSecurity}
                className="form-checkbox h-6 w-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">Biometric Authentication</label>
              <input
                type="checkbox"
                name="biometricAuth"
                checked={securitySettings.biometricAuth}
                onChange={handleChangeSecurity}
                className="form-checkbox h-6 w-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="sessionTimeout">Session Timeout (minutes)</label>
              <input
                type="number"
                id="sessionTimeout"
                name="sessionTimeout"
                value={securitySettings.sessionTimeout}
                onChange={handleChangeSecurity}
                min="1"
                max="120"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
        </div>

        {/* Theme Settings Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Theme Settings</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">Theme</label>
              <select
                name="theme"
                value={themeSettings.theme}
                onChange={handleChangeTheme}
                className="w-40 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="accentColor">Accent Color</label>
              <input
                type="color"
                id="accentColor"
                name="accentColor"
                value={themeSettings.accentColor}
                onChange={handleChangeTheme}
                className="w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="font">Font</label>
              <select
                id="font"
                name="font"
                value={themeSettings.font}
                onChange={handleChangeTheme}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="system">System Font</option>
                <option value="sans">Sans Serif</option>
                <option value="serif">Serif</option>
                <option value="mono">Monospace</option>
              </select>
            </div>
          </div>
        </div>

        {/* Backup & Restore Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Backup & Restore</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">Auto Backup</label>
              <input
                type="checkbox"
                name="autoBackup"
                checked={backupSettings.autoBackup}
                onChange={handleChangeBackup}
                className="form-checkbox h-6 w-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="backupFrequency">Backup Frequency</label>
              <select
                id="backupFrequency"
                name="backupFrequency"
                value={backupSettings.backupFrequency}
                onChange={handleChangeBackup}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleBackupNow}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Backup Now
              </button>
              <button
                onClick={handleRestore}
                className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              >
                Restore
              </button>
            </div>
            <div className="text-sm text-gray-600">
              Last backup: {backupSettings.lastBackup ? new Date(backupSettings.lastBackup).toLocaleDateString() : 'Never'}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold mb-6 text-gray-800">About Chama Plus</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Version</h3>
              <p className="text-gray-600">1.0.0</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Privacy Policy</h3>
              <p className="text-gray-600">View our privacy policy</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Terms of Service</h3>
              <p className="text-gray-600">View our terms of service</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Contact Support</h3>
              <p className="text-gray-600">support@chamaplus.com</p>
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
          Save All Changes
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
