import React from "react";

function MeetingsPage() {
  const upcomingMeetings = [
    {
      id: "1",
      chama: "Mwanzo Chama",
      date: "May 5, 2025",
      time: "10:00 AM",
      location: "Community Hall",
      agenda: ["Review contributions", "Discuss upcoming projects"],
    },
    {
      id: "2",
      chama: "Ujenzi Chama",
      date: "May 12, 2025",
      time: "2:00 PM",
      location: "Chama Leader's Home",
      agenda: ["Loan applications review", "Fundraising strategy"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-100 p-4 pt-20">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-2xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg">Meetings</h1>
          <p className="text-lg text-blue-50">Manage and view upcoming chama meetings</p>
        </div>

        {/* Upcoming Meetings */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Upcoming Meetings</h2>
          {upcomingMeetings.length === 0 ? (
            <div className="flex flex-col items-center py-10">
              <svg className="w-16 h-16 text-blue-200 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
              <p className="text-gray-500 text-lg">No upcoming meetings scheduled.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingMeetings.map((meeting) => (
                <div key={meeting.id} className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 border border-blue-100 rounded-2xl shadow p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-xl text-green-700 mb-1">{meeting.chama} Meeting</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <span className="mr-3"><span className="font-semibold">Date:</span> {meeting.date}</span>
                      <span><span className="font-semibold">Time:</span> {meeting.time}</span>
                    </div>
                    <div className="text-gray-600 text-sm mb-2">
                      <span className="font-semibold">Location:</span> {meeting.location}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mt-2 text-sm">Agenda:</h4>
                      <ul className="list-disc list-inside text-gray-600 text-sm">
                        {meeting.agenda.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-300 transition-all text-sm">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MeetingsPage;
