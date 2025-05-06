import React from "react"; // Import React
import { Wallet, User, Calendar } from "lucide-react"; // Import icons
import StatCard from "../components/StatCard"; // Assuming StatCard is in the same or a relative directory

function ContributionsPage() {
  const contributionHistory = [
    {
      date: "Apr 15, 2025",
      amount: "KSH 2,000",
      method: "M-Pesa",
      status: "Completed",
    },
    {
      date: "Mar 15, 2025",
      amount: "KSH 2,000",
      method: "M-Pesa",
      status: "Completed",
    },
    {
      date: "Feb 15, 2025",
      amount: "KSH 2,000",
      method: "M-Pesa",
      status: "Completed",
    },
    {
      date: "Jan 15, 2025",
      amount: "KSH 2,000",
      method: "M-Pesa",
      status: "Completed",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-100 p-4 pt-20">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <p className="text-sm text-blue-50 mb-2">
                My Chamas &gt; Mwanzo Chama &gt; <span className="font-bold text-white">Contributions</span>
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">Mwanzo Chama - Contributions</h1>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-2xl shadow p-6 flex flex-col items-center text-center">
            <div className="mb-2 p-3 rounded-full bg-gradient-to-tr from-green-300 via-blue-200 to-purple-200">
              <Wallet className="text-green-700 text-2xl" />
            </div>
            <div className="font-semibold text-lg text-gray-800">Total Contributions</div>
            <div className="text-2xl font-extrabold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mt-1">KSH 145,000</div>
          </div>
          <div className="bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-2xl shadow p-6 flex flex-col items-center text-center">
            <div className="mb-2 p-3 rounded-full bg-gradient-to-tr from-green-300 via-blue-200 to-purple-200">
              <User className="text-green-700 text-2xl" />
            </div>
            <div className="font-semibold text-lg text-gray-800">Your Contributions</div>
            <div className="text-2xl font-extrabold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mt-1">KSH 12,000</div>
          </div>
          <div className="bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-2xl shadow p-6 flex flex-col items-center text-center">
            <div className="mb-2 p-3 rounded-full bg-gradient-to-tr from-green-300 via-blue-200 to-purple-200">
              <Calendar className="text-green-700 text-2xl" />
            </div>
            <div className="font-semibold text-lg text-gray-800">Next Due Date</div>
            <div className="text-2xl font-extrabold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mt-1">May 15, 2025</div>
          </div>
        </div>

        {/* Contribution History Table/Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Contribution History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Method</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {contributionHistory.map((contrib, idx) => (
                  <tr key={idx} className="hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-3 text-gray-700 font-medium">{contrib.date}</td>
                    <td className="px-4 py-3 text-blue-700 font-bold">{contrib.amount}</td>
                    <td className="px-4 py-3 text-gray-600">{contrib.method}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                        ${contrib.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{contrib.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContributionsPage; // Add the default export
