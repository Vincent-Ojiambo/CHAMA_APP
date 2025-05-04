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
    <div className="pt-20 px-6 ml-56">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Meetings</h1>
        <p className="text-gray-600">Manage and view upcoming chama meetings</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Meetings</h2>
          {upcomingMeetings.length === 0 ? (
            <p className="text-gray-500">No upcoming meetings scheduled.</p>
          ) : (
            <ul className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <li key={meeting.id} className="border rounded-md p-4">
                  <h3 className="font-semibold text-gray-800">
                    {meeting.chama} Meeting
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Date: {meeting.date} | Time: {meeting.time}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Location: {meeting.location}
                  </p>
                  <div>
                    <h4 className="font-semibold text-gray-700 mt-2 text-sm">
                      Agenda:
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 text-sm">
                      {meeting.agenda.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-3">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm mr-2">
                      View Details
                    </button>
                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded text-sm">
                      Edit
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Schedule New Meeting
          </button>
        </div>
      </div>
    </div>
  );
}

export default MeetingsPage;
