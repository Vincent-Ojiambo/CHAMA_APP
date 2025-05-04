import React from "react"; // Import React

function ReportsPage() {
  return (
    <div className="pt-20 px-6 ml-56">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Financial Reports</h1>
        <p className="text-gray-600">View and download financial reports</p>
      </div>

      {/* Report Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Chama
            </label>
            <select className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700">
              <option>All Chamas</option>
              <option>Mwanzo Chama</option>
              <option>Ujenzi Chama</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Date Range
            </label>
            <select className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700">
              <option>Last 6 months</option>
              <option>Last 3 months</option>
              <option>Last month</option>
              <option>Custom range</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Report Type
            </label>
            <select className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700">
              <option>Contributions</option>
              <option>Loans</option>
              <option>Member Activity</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Contribution Growth</h2>

        <div className="relative h-64">
          {/* This would be replaced with an actual chart library in a real implementation */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between h-48">
            {["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"].map(
              (month, index) => (
                <div key={index} className="flex flex-col items-center w-1/7">
                  <div
                    className="bg-green-500 w-6 rounded-t-md"
                    style={{ height: `${30 + index * 20}px` }}
                  ></div>
                  <span className="text-xs text-gray-600 mt-2">{month}</span>
                </div>
              )
            )}
          </div>

          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-right">
            <span className="text-xs text-gray-600">250K</span>
            <span className="text-xs text-gray-600">200K</span>
            <span className="text-xs text-gray-600">150K</span>
            <span className="text-xs text-gray-600">100K</span>
            <span className="text-xs text-gray-600">50K</span>
            <span className="text-xs text-gray-600">0</span>
          </div>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex justify-end space-x-4">
        <button className="border-2 border-green-600 text-green-600 font-bold py-2 px-4 rounded hover:bg-green-50">
          PDF
        </button>
        <button className="border-2 border-green-600 text-green-600 font-bold py-2 px-4 rounded hover:bg-green-50">
          CSV
        </button>
      </div>
    </div>
  );
}

export default ReportsPage; // Add the default export
