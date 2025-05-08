import React from "react";

function ChamaDetailsPage({ chama, hidePersonal }) {
  const [isMember, setIsMember] = React.useState(chama?.role !== 'Guest');
  const [members, setMembers] = React.useState(chama?.members || 0);
  const [totalFunds, setTotalFunds] = React.useState(
    typeof chama?.totalFunds === 'string' ? parseFloat(chama.totalFunds.replace(/[^\d.]/g, '')) : chama?.totalFunds || 0
  );
  const [contribution, setContribution] = React.useState(
    typeof chama?.contribution === 'string' ? parseFloat(chama.contribution.replace(/[^\d.]/g, '')) : chama?.contribution || 0
  );
  const userContribution = React.useRef(contribution);
  const [showJoinForm, setShowJoinForm] = React.useState(false);
  const [joinDetails, setJoinDetails] = React.useState({
    name: '',
    gender: '',
    age: '',
    county: '',
    subcounty: '',
    village: '',
    role: 'Member',
  });

  // If chama is not passed, show a fallback (could fetch by ID in a real app)
  if (!chama) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-bold text-gray-600">No Chama selected.</div>
      </div>
    );
  }

  const handleBack = () => {
    window.dispatchEvent(new CustomEvent("navigateTo", { detail: "my-chamas" }));
  };

  const handleJoin = () => {
    setShowJoinForm(true);
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    setIsMember(true);
    setMembers((prev) => prev + 1);
    setTotalFunds((prev) => prev + userContribution.current);
    setContribution(userContribution.current);
    // Add user details to memberList (simulate update)
    if (Array.isArray(chama.memberList)) {
      chama.memberList.push({ ...joinDetails });
    }
    setShowJoinForm(false);
    // In a real app, here you would call an API to join the chama
  };

  const handleJoinChange = (e) => {
    const { name, value } = e.target;
    setJoinDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleLeave = () => {
    setIsMember(false);
    setMembers((prev) => (prev > 0 ? prev - 1 : 0));
    setTotalFunds((prev) => (prev - userContribution.current >= 0 ? prev - userContribution.current : 0));
    setContribution(0);
    // In a real app, here you would call an API to leave the chama
  };

  // Sort members: Admin, Chairperson, Treasurer, Secretary, then Members (others)
  const sortRoles = ["Admin", "Chairperson", "Treasurer", "Secretary", "Member"];
  const sortedMembers = Array.isArray(chama.memberList)
    ? [...chama.memberList].sort((a, b) => {
        const aIdx = sortRoles.indexOf(a.role);
        const bIdx = sortRoles.indexOf(b.role);
        // If both roles are found, sort by index
        if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
        // If only one role is found, put it first
        if (aIdx !== -1) return -1;
        if (bIdx !== -1) return 1;
        // Otherwise, sort alphabetically by role
        return a.role.localeCompare(b.role);
      })
    : [];

  // Use the chama's statistics object
  const chamaStats = chama.statistics || {
    totalContributions: 0,
    totalWithdrawals: 0,
    totalInvestments: 0,
    activeMembers: 1,
    pendingMembers: 0,
    totalMeetings: 0,
    averageAttendance: 100,
    currentBalance: 0,
    lastContributionDate: chama.created,
    lastMeetingDate: chama.created
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-100 p-4 pt-20">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-8">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-2">{chama.name}</h1>
        <div className="mb-2 text-gray-600 text-base font-semibold">Description: <span className="font-normal">{chama.description || "No description provided."}</span></div>
        <div className="mb-4 text-gray-500">Date of Creation: {chama.created || "N/A"}</div>
        <div className="mb-4 text-gray-500">Created: {chama.created}</div>
        <div className="flex flex-wrap gap-4 mb-6">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold text-xs">Role: {isMember ? chama.role : 'Guest'}</span>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold text-xs">Members: {members}</span>
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold text-xs">Funds: KSH {totalFunds.toLocaleString()}</span>
          <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full font-semibold text-xs">Contribution: KSH {contribution.toLocaleString()}</span>
        </div>
        <div className="mb-6">
          {/* Chama Statistical Data */}
          <h2 className="text-xl font-bold mb-2 text-gray-700 mt-8">Chama Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl shadow p-4 mb-6">
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">Total Contributions</span>
              <span className="font-bold text-blue-700 text-lg">KSH {chamaStats.totalContributions.toLocaleString()}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">Total Withdrawals</span>
              <span className="font-bold text-red-700 text-lg">KSH {chamaStats.totalWithdrawals.toLocaleString()}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">Total Investments</span>
              <span className="font-bold text-purple-700 text-lg">KSH {chamaStats.totalInvestments.toLocaleString()}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">Active Members</span>
              <span className="font-bold text-green-700 text-lg">{chamaStats.activeMembers}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">Pending Members</span>
              <span className="font-bold text-orange-700 text-lg">{chamaStats.pendingMembers}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">Total Meetings</span>
              <span className="font-bold text-purple-700 text-lg">{chamaStats.totalMeetings}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">Average Attendance</span>
              <span className="font-bold text-blue-700 text-lg">{chamaStats.averageAttendance}%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">Current Balance</span>
              <span className="font-bold text-green-700 text-lg">KSH {chamaStats.currentBalance.toLocaleString()}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">Last Contribution</span>
              <span className="font-bold text-blue-700 text-lg">{chamaStats.lastContributionDate}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">Last Meeting</span>
              <span className="font-bold text-purple-700 text-lg">{chamaStats.lastMeetingDate}</span>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-2 text-gray-700 mt-8">Members</h2>
          {hidePersonal ? (
            <div className="bg-blue-50 rounded-xl shadow mb-4 p-4 text-gray-600 italic">Personal member information is hidden for non-members. Only chama statistics and general info are shown.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-blue-50 rounded-xl shadow mb-4">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700">Role</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700">Gender</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700">Age</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700">County</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700">Subcounty</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700">Village</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedMembers.length > 0 ? (
                    sortedMembers.map((member, idx) => (
                      <tr key={idx} className="border-b border-blue-100 last:border-0 hover:bg-blue-100 transition">
                        <td className="px-4 py-2 font-semibold text-gray-800 whitespace-nowrap">{member.name}</td>
                        <td className="px-4 py-2"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold text-xs">{member.role}</span></td>
                        <td className="px-4 py-2 text-gray-700">{member.gender}</td>
                        <td className="px-4 py-2 text-gray-700">{member.age}</td>
                        <td className="px-4 py-2 text-gray-700">{member.county}</td>
                        <td className="px-4 py-2 text-gray-700">{member.subcounty}</td>
                        <td className="px-4 py-2 text-gray-700">{member.village}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={7} className="px-4 py-2 text-center text-gray-400 italic">No members listed.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
          <div className="flex gap-4">
            {!isMember && (
              <button
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold px-6 py-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
                onClick={handleJoin}
              >
                Join Chama
              </button>
            )}
            {isMember && (
              <button
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold px-6 py-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
                onClick={handleLeave}
              >
                Leave Chama
              </button>
            )}
          </div>
          <button onClick={handleBack} className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow focus:outline-none focus:ring-2 focus:ring-green-300 transition-all">Back to My Chamas</button>
        </div>
        {/* Join Chama Modal/Form */}
        {showJoinForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <form className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md space-y-4" onSubmit={handleJoinSubmit}>
              <h2 className="text-xl font-bold mb-4 text-blue-800">Join Chama</h2>
              <div className="grid grid-cols-1 gap-4">
                <input name="name" value={joinDetails.name} onChange={handleJoinChange} required placeholder="Full Name" className="border rounded px-3 py-2 w-full" />
                <select name="gender" value={joinDetails.gender} onChange={handleJoinChange} required className="border rounded px-3 py-2 w-full">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <input name="age" value={joinDetails.age} onChange={handleJoinChange} required type="number" min="18" placeholder="Age" className="border rounded px-3 py-2 w-full" />
                <input name="county" value={joinDetails.county} onChange={handleJoinChange} required placeholder="County of Birth" className="border rounded px-3 py-2 w-full" />
                <input name="subcounty" value={joinDetails.subcounty} onChange={handleJoinChange} required placeholder="Subcounty" className="border rounded px-3 py-2 w-full" />
                <input name="village" value={joinDetails.village} onChange={handleJoinChange} required placeholder="Village" className="border rounded px-3 py-2 w-full" />
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button type="button" className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={() => setShowJoinForm(false)}>Cancel</button>
                <button type="submit" className="px-6 py-2 rounded bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold hover:from-green-600 hover:to-blue-600">Join</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChamaDetailsPage;
