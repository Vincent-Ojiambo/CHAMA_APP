// import React from "react";
// import { useState } from "react";

// function MyChamasPage() {
//   const [chamas, setChamas] = useState([
//     {
//       id: "1",
//       name: "Mwanzo Chama",
//       created: "Jan 15, 2025",
//       members: 12,
//       totalFunds: "KSH 145,000",
//       contribution: "KSH 12,000",
//       role: "Member",
//     },
//     {
//       id: "2",
//       name: "Ujenzi Chama",
//       created: "Mar 5, 2025",
//       members: 8,
//       totalFunds: "KSH 98,000",
//       contribution: "KSH 10,000",
//       role: "Treasurer",
//     },
//   ]);

//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [newChamaName, setNewChamaName] = useState("");
//   const [newChamaDescription, setNewChamaDescription] = useState("");
//   const [newChamaContribution, setNewChamaContribution] = useState("");

//   const handleCreateChama = (e) => {
//     e.preventDefault();
//     const newChama = {
//       id: Date.now().toString(), // Simple unique ID for now
//       name: newChamaName,
//       created: new Date().toLocaleDateString(),
//       members: 1, // Creator is the first member
//       totalFunds: "KSH 0",
//       contribution: parseFloat(newChamaContribution) || 0,
//       role: "Admin", // Assuming creator is an admin
//     };
//     setChamas([...chamas, newChama]);
//     setShowCreateForm(false);
//     setNewChamaName("");
//     setNewChamaDescription("");
//     setNewChamaContribution("");
//     // In a real application, you'd send this data to your backend
//   };

//   return (
//     <div className="pt-20 px-6 ml-56">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">My Chamas</h1>
//           <p className="text-gray-600">Manage your savings groups</p>
//         </div>
//         <button
//           onClick={() => setShowCreateForm(true)}
//           className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
//         >
//           <span className="mr-1">+</span> New
//         </button>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Chama Cards */}
//         <div className="lg:col-span-2 space-y-6">
//           {chamas.map((chama) => (
//             <div key={chama.id} className="bg-white rounded-lg shadow p-6">
//               <div className="flex justify-between">
//                 <div>
//                   <h2 className="text-xl font-semibold">{chama.name}</h2>
//                   <p className="text-gray-500 text-sm">
//                     Created: {chama.created} • Members: {chama.members}
//                   </p>
//                   <div className="mt-4 space-y-2">
//                     <p className="text-gray-800">
//                       Total Funds: {chama.totalFunds}
//                     </p>
//                     <p className="text-gray-800">
//                       Your Contribution: {chama.contribution}
//                     </p>
//                     <p className="text-gray-500 text-sm">Role: {chama.role}</p>
//                   </div>
//                 </div>
//                 <button className="h-10 px-4 border-2 border-green-600 text-green-600 rounded hover:bg-green-50">
//                   View
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Create New Chama Form */}
//         {showCreateForm && (
//           <div>
//             <div className="bg-white rounded-lg shadow p-6">
//               <h2 className="text-lg font-semibold mb-1">Create New Chama</h2>
//               <p className="text-gray-500 text-sm mb-4">
//                 Start a new savings group
//               </p>

//               <form onSubmit={handleCreateChama}>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-medium mb-2">
//                     Chama Name
//                   </label>
//                   <input
//                     type="text"
//                     className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700"
//                     value={newChamaName}
//                     onChange={(e) => setNewChamaName(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-medium mb-2">
//                     Description
//                   </label>
//                   <textarea
//                     className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700 h-24"
//                     value={newChamaDescription}
//                     onChange={(e) => setNewChamaDescription(e.target.value)}
//                   />
//                 </div>

//                 <div className="mb-6">
//                   <label className="block text-gray-700 text-sm font-medium mb-2">
//                     Contribution Amount (KSH)
//                   </label>
//                   <input
//                     type="number"
//                     className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700"
//                     value={newChamaContribution}
//                     onChange={(e) => setNewChamaContribution(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="flex justify-end">
//                   <button
//                     type="button"
//                     className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
//                     onClick={() => setShowCreateForm(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//                   >
//                     Create Chama
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default MyChamasPage;

import React from "react";
import { useState } from "react";

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
    <div className="pt-20 px-6 ml-56">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Chamas</h1>
      <p className="text-gray-600 mb-4">Manage your savings groups</p>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <span className="mr-1">+</span> New Chama
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chama Cards */}
        <section className="space-y-6">
          {chamas.map((chama) => (
            <div key={chama.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {chama.name}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Created: {chama.created} • Members: {chama.members}
                  </p>
                  <div className="mt-4 space-y-2">
                    <p className="text-gray-800">
                      Total Funds:{" "}
                      <span className="font-semibold">{chama.totalFunds}</span>
                    </p>
                    <p className="text-gray-800">
                      Your Contribution:{" "}
                      <span className="font-semibold">
                        {chama.contribution}
                      </span>
                    </p>
                    <p className="text-gray-500 text-sm">Role: {chama.role}</p>
                  </div>
                </div>
                <button className="h-10 px-4 border-2 border-green-600 text-green-600 rounded hover:bg-green-50 font-semibold">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Create New Chama Form */}
        {showCreateForm && (
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Create New Chama
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Start a new savings group
            </p>

            <form onSubmit={handleCreateChama} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Chama Name
                </label>
                <input
                  type="text"
                  className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700"
                  value={newChamaName}
                  onChange={(e) => setNewChamaName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Description (Optional)
                </label>
                <textarea
                  className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700 h-24"
                  value={newChamaDescription}
                  onChange={(e) => setNewChamaDescription(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Contribution Amount (KSH)
                </label>
                <input
                  type="number"
                  className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700"
                  value={newChamaContribution}
                  onChange={(e) => setNewChamaContribution(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Create Chama
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </div>
  );
}

export default MyChamasPage;
