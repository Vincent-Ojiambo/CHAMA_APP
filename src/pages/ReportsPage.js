import React from "react";

function ReportsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-100 p-4 pt-20">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-2xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg">Financial Reports</h1>
          <p className="text-lg text-blue-50">View and download financial reports</p>
        </div>

        {/* Report Filters */}
        <div className="bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-2xl shadow p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Chama</label>
              <select className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-green-300">
                <option>All Chamas</option>
                <option>Mwanzo Chama</option>
                <option>Ujenzi Chama</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Date Range</label>
              <select className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-green-300">
                <option>Last 6 months</option>
                <option>Last 3 months</option>
                <option>Last month</option>
                <option>Custom range</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Report Type</label>
              <select className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-green-300">
                <option>Contributions</option>
                <option>Loans</option>
                <option>Member Activity</option>
              </select>
            </div>
            <div className="flex items-end">
              <button type="button" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full shadow focus:outline-none focus:ring-2 focus:ring-green-300 transition-all">Apply</button>
            </div>
          </div>
        </div>

        {/* Chart/Card Area */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Contribution Growth</h2>
          <div className="flex flex-col items-center justify-center min-h-[180px]">
            {/* Placeholder for Chart */}
            <div className="w-full h-32 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-blue-300 font-bold text-lg">
              [Chart Placeholder]
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Recent Reports</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Chama</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Report Type</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-3 text-gray-700 font-medium">May 1, 2025</td>
                  <td className="px-4 py-3 text-blue-700 font-bold">Mwanzo Chama</td>
                  <td className="px-4 py-3 text-gray-600">Contributions</td>
                  <td className="px-4 py-3"><span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Ready</span></td>
                  <td className="px-4 py-3"><button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-300 transition-all">Download</button></td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-3 text-gray-700 font-medium">Apr 1, 2025</td>
                  <td className="px-4 py-3 text-blue-700 font-bold">Ujenzi Chama</td>
                  <td className="px-4 py-3 text-gray-600">Loans</td>
                  <td className="px-4 py-3"><span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Ready</span></td>
                  <td className="px-4 py-3"><button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-300 transition-all">Download</button></td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-3 text-gray-700 font-medium">Mar 1, 2025</td>
                  <td className="px-4 py-3 text-blue-700 font-bold">Mwanzo Chama</td>
                  <td className="px-4 py-3 text-gray-600">Member Activity</td>
                  <td className="px-4 py-3"><span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">Ready</span></td>
                  <td className="px-4 py-3"><button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-300 transition-all">Download</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
