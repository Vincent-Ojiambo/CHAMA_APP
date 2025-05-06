import React, { useState } from "react";

function MyChamasPage() {
  const [chamas, setChamas] = useState([
    {
      id: "1",
      name: "Mwanzo Chama",
      created: "Jan 15, 2025",
      members: 12,
      totalFunds: "KSH 145,000",
      contribution: "KSH 12,000",
      role: "Member",
    },
    {
      id: "2",
      name: "Ujenzi Chama",
      created: "Mar 5, 2025",
      members: 8,
      totalFunds: "KSH 98,000",
      contribution: "KSH 10,000",
      role: "Treasurer",
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newChamaName, setNewChamaName] = useState("");
  const [newChamaDescription, setNewChamaDescription] = useState("");
  const [newChamaContribution, setNewChamaContribution] = useState("");

  const handleCreateChama = (e) => {
    e.preventDefault();
    const newChama = {
      id: Date.now().toString(),
      name: newChamaName,
      created: new Date().toLocaleDateString(),
      members: 1,
      totalFunds: "KSH 0",
      contribution: parseFloat(newChamaContribution) || 0,
      role: "Admin",
    };
    setChamas([...chamas, newChama]);
    setShowCreateForm(false);
    setNewChamaName("");
    setNewChamaDescription("");
    setNewChamaContribution("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-100 p-4 pt-20">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center justify-between mb-6 relative overflow-hidden">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg">My Chamas</h1>
            <p className="text-lg text-blue-50 mb-4 md:mb-0">Manage your savings groups and create new ones with ease.</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="relative bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 text-white font-extrabold py-3 px-6 rounded-xl shadow-2xl flex items-center text-base transition-all focus:outline-none focus:ring-4 focus:ring-blue-200 hover:scale-105 hover:shadow-3xl border-2 border-white/60 group overflow-hidden"
          >
            <span className="absolute -left-3 -top-3 w-10 h-10 bg-white/10 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-all duration-300"></span>
            <span className="mr-2 text-2xl drop-shadow-lg">+</span> Add New Chama
          </button>
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-bl-full z-0" />
        </div>

        {/* Chamas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {chamas.map((chama) => (
            <div key={chama.id} className="bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-2xl shadow-xl p-6 flex flex-col relative group hover:shadow-2xl transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="inline-block bg-green-200 text-green-700 rounded-full px-2 py-1 text-xs font-semibold mr-2">{chama.role}</span>
                  {chama.name}
                </h2>
                <span className="text-xs text-gray-500">{chama.created}</span>
              </div>
              <div className="flex flex-col space-y-2 mt-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="inline-block bg-blue-100 text-blue-700 rounded-full px-2 py-1 text-xs font-semibold">Members: {chama.members}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="inline-block bg-purple-100 text-purple-700 rounded-full px-2 py-1 text-xs font-semibold">Funds: {chama.totalFunds}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="inline-block bg-green-50 text-green-700 rounded-full px-2 py-1 text-xs font-semibold">Contribution: {chama.contribution}</span>
                </div>
              </div>
              <button className="mt-auto text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-4 py-2 rounded-lg font-semibold shadow focus:outline-none focus:ring-2 focus:ring-green-300 transition-all">View</button>
            </div>
          ))}
        </div>

        {/* Create Chama Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-fadeIn">
              <button
                onClick={() => setShowCreateForm(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Chama</h2>
              <form onSubmit={handleCreateChama} className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Chama Name</label>
                  <input
                    type="text"
                    value={newChamaName}
                    onChange={(e) => setNewChamaName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Description (optional)</label>
                  <textarea
                    value={newChamaDescription}
                    onChange={(e) => setNewChamaDescription(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Monthly Contribution</label>
                  <input
                    type="number"
                    value={newChamaContribution}
                    onChange={(e) => setNewChamaContribution(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg mt-4 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
                >
                  Create Chama
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyChamasPage;
