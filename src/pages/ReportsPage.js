import React, { useRef } from 'react';
import ContributionGrowthChart from '../components/ContributionGrowthChart';
import PDFExporter from '../components/PDFExporter';

function ReportsPage() {
  const contributions = [
    { id: 1, date: "2025-01-15", amount: "KSH 5,000", chama: "Mwanzo Chama" },
    { id: 2, date: "2025-01-20", amount: "KSH 3,000", chama: "Ujenzi Chama" },
    { id: 3, date: "2025-02-05", amount: "KSH 7,500", chama: "Mwanzo Chama" },
    { id: 4, date: "2025-02-15", amount: "KSH 4,000", chama: "Ujenzi Chama" },
    { id: 5, date: "2025-03-01", amount: "KSH 6,000", chama: "Mwanzo Chama" },
    { id: 6, date: "2025-03-10", amount: "KSH 3,500", chama: "Ujenzi Chama" },
    { id: 7, date: "2025-04-05", amount: "KSH 8,000", chama: "Mwanzo Chama" },
    { id: 8, date: "2025-04-20", amount: "KSH 4,500", chama: "Ujenzi Chama" },
    { id: 9, date: "2025-05-01", amount: "KSH 9,000", chama: "Mwanzo Chama" },
    { id: 10, date: "2025-05-15", amount: "KSH 5,000", chama: "Ujenzi Chama" }
  ];

  const chartRef = useRef(null);

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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Contribution Growth</h2>
            <PDFExporter 
              title="Chama Plus Contribution Report"
              data={contributions}
              type="contributions"
            />
          </div>
          <div ref={chartRef} className="chart-container">
            <ContributionGrowthChart contributions={contributions} />
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
