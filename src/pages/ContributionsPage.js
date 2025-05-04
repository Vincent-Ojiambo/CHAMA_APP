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
    <div className="pt-20 px-6 ml-56">
      <div className="mb-2">
        <p className="text-sm">
          <span className="text-gray-500">
            My Chamas &gt; Mwanzo Chama &gt;{" "}
          </span>
          <span className="text-gray-800 font-medium">Contributions</span>
        </p>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Mwanzo Chama - Contributions
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          icon={<Wallet />}
          title="Total Contributions"
          value="KSH 145,000"
        />
        <StatCard
          icon={<User />}
          title="Your Contributions"
          value="KSH 12,000"
        />
        <StatCard
          icon={<Calendar />}
          title="Next Due Date"
          value="May 15, 2025"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Contribution History */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 pb-0">
              <h2 className="text-lg font-semibold mb-4">
                Contribution History
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase">
                      Method
                    </th>
                    <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {contributionHistory.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="py-3 px-6 text-sm">{item.date}</td>
                      <td className="py-3 px-6 text-sm">{item.amount}</td>
                      <td className="py-3 px-6 text-sm">{item.method}</td>
                      <td className="py-3 px-6 text-sm text-green-600">
                        {item.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Make Contribution Panel */}
        <div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Make Contribution</h2>

            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Amount (KSH)
                </label>
                <input
                  type="number"
                  className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Payment Method
                </label>
                <select className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700">
                  <option>M-Pesa</option>
                  <option>Bank Transfer</option>
                  <option>Cash</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Pay Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContributionsPage; // Add the default export
