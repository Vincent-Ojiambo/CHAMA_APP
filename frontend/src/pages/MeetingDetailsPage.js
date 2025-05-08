import React from "react";

function MeetingDetailsPage({ meeting, onBack }) {
  if (!meeting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-bold text-gray-600">No Meeting selected.</div>
      </div>
    );
  }

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.dispatchEvent(new CustomEvent("navigateTo", { detail: { page: "meetings" } }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-100 p-4 pt-20">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-extrabold text-blue-800">Meeting Details</h1>
          <button
            onClick={handleBack}
            className="text-blue-600 hover:underline font-semibold"
          >
            Back to Meetings
          </button>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{meeting.chama} Meeting</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <span className="font-bold text-blue-600">Date:</span> {meeting.date}
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <span className="font-bold text-blue-600">Time:</span> {meeting.time}
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <span className="font-bold text-blue-600">Location:</span> {meeting.location}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Agenda Items</h3>
          <div className="space-y-4">
            {meeting.agenda.map((item, index) => (
              <div key={index} className="pl-4 border-l-4 border-blue-400">
                <div className="text-gray-600">{item}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Meeting Notes</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">No notes have been added yet.</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Attendees</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">No attendees have been added yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeetingDetailsPage;
