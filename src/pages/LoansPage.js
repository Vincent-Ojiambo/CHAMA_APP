import React from "react";

function LoansPage() {
  const loans = [
    {
      id: "1",
      chama: "Ujenzi Chama",
      amount: "KSH 15,000",
      appliedDate: "Apr 20, 2025",
      status: "Approved",
      dueDate: "Jul 20, 2025",
    },
    {
      id: "2",
      chama: "Mwanzo Chama",
      amount: "KSH 8,000",
      appliedDate: "Mar 10, 2025",
      status: "Repaid",
      dueDate: "Jun 10, 2025",
    },
    {
      id: "3",
      chama: "Ujenzi Chama",
      amount: "KSH 20,000",
      appliedDate: "Feb 5, 2025",
      status: "Rejected",
      dueDate: "N/A",
    },
  ];

  return (
    <div className="pt-20 px-6 ml-56">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Loans</h1>
        <p className="text-gray-600">Manage your chama loans</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Your Loan Applications</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                    Chama
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                    Applied Date
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                    Due Date
                  </th>
                  <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">{loan.chama}</td>
                    <td className="py-3 px-4 text-sm">{loan.amount}</td>
                    <td className="py-3 px-4 text-sm">{loan.appliedDate}</td>
                    <td className="py-3 px-4 text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          loan.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : loan.status === "Repaid"
                            ? "bg-blue-100 text-blue-800"
                            : loan.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {loan.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {loan.dueDate === "N/A" ? "-" : loan.dueDate}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {loan.status === "Approved" && (
                        <button className="text-green-600 hover:text-green-800 mr-2">
                          View Details
                        </button>
                      )}
                      {loan.status === "Rejected" && (
                        <span className="text-gray-500">No actions</span>
                      )}
                      {loan.status === "Repaid" && (
                        <span className="text-gray-500">Loan Repaid</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Apply for a Loan
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoansPage;
