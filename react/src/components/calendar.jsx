import React, { useState } from "react";

const AppointmentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock data - in a real app this would come from an API
  const availableSlots = {
    "2025-01-20": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
    "2025-01-21": ["09:30", "10:30", "13:00", "14:30", "15:30"],
    "2025-01-22": ["10:00", "11:00", "15:00", "16:00"],
    "2025-01-23": ["09:00", "13:00", "14:00", "16:00"],
    "2025-01-24": ["10:00", "11:00", "14:00", "15:00", "16:00"],
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleSlotClick = (time) => {
    alert(`Appointment booked for ${selectedDate.toDateString()} at ${time}`);
    // In a real app, you'd handle the booking logic here
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const daysInMonth = getDaysInMonth(selectedDate);
  const selectedDateString = formatDate(selectedDate);
  const slotsForSelectedDate = availableSlots[selectedDateString] || [];

  const goToPreviousMonth = () => {
    setSelectedDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setSelectedDate(new Date(currentYear, currentMonth + 1, 1));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          &lt;
        </button>
        <h2 className="text-lg font-semibold">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button
          onClick={goToNextMonth}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          &gt;
        </button>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-6">
        {daysInMonth.map((date, index) => (
          <div key={index} className="aspect-square">
            {date && (
              <button
                onClick={() => handleDateClick(date)}
                className={`w-full h-full rounded text-sm transition-colors ${
                  formatDate(date) === selectedDateString
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                } ${
                  date.toDateString() === new Date().toDateString()
                    ? "ring-2 ring-blue-300"
                    : ""
                }`}
              >
                {date.getDate()}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Selected Date Display */}
      <div className="mb-4">
        <h3 className="text-md font-medium text-gray-700">
          Available appointments for {selectedDate.toDateString()}:
        </h3>
      </div>

      {/* Available Time Slots */}
      <div className="grid grid-cols-3 gap-2">
        {slotsForSelectedDate.length > 0 ? (
          slotsForSelectedDate.map((time) => (
            <button
              key={time}
              onClick={() => handleSlotClick(time)}
              className="px-3 py-2 bg-green-100 text-green-700 rounded border border-green-300 hover:bg-green-200 transition-colors text-sm font-medium"
            >
              {time}
            </button>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500 py-4">
            No appointments available for this date
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCalendar;
