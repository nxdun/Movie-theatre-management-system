import React, { useState } from 'react';
import './Showtimes.css';

const Showtimes = () => {
  // Sample data
  const showtimesByDate = {
    '2023-09-22': ['10:30', '14:30', '18:30'],
    '2023-09-23': ['10:30', '14:30', '18:30'],
    '2023-09-24': ['10:30', '14:30', '18:30'],
    '2023-09-25': ['10:30', '14:30', '18:30'],
    '2023-09-26': ['10:30', '14:30', '18:30'],
    '2023-09-27': ['10:30', '14:30', '18:30'],
    '2023-09-28': ['10:30', '14:30', '18:30'],
    '2023-09-29': ['10:30', '14:30', '18:30'],
  };

  // get dates; starting from today, along with day names
  const getWeekDates = () => {
    const today = new Date();
    const offset = 330 * 60 * 1000;
    const todayWithOffset = new Date(today.getTime() + offset); // matching the local time zone
    const weekDates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(todayWithOffset);
      date.setDate(todayWithOffset.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long'}); // Get the day name
      weekDates.push({ date: dateString, day: dayName });
    }

    return weekDates;
  };

  const weekDates = getWeekDates();

  const [selectedDate, setSelectedDate] = useState(weekDates[0]?.date || null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  // handle date click
  const handleDateClick = (date) => {
    if (date === selectedDate) {

      setSelectedDate(null);
      setSelectedShowtime(null);
    } else {
      setSelectedDate(date);
    }
  };

  // Function to handle showtime click
  const handleShowtimeClick = (showtime) => {
    if (showtime === selectedShowtime) {
      // If the same showtime is clicked twice, deselect it
      setSelectedShowtime(null);

    } else {
      setSelectedShowtime(showtime);
      setAlertMessage(null); // Clear the alert message
    }
  };

  const handleContinueClick = () => {
    if (!selectedShowtime) {
      // If no showtime is selected, show an alert
      setAlertMessage("Please select a showtime");

      setTimeout(() => {
        setAlertMessage(null);
      }, 3000);

    } else {
      console.log("Selected Showtime:", selectedShowtime);
    }
  };

  // Generate the array of dates
 // const weekDates = getWeekDates();

  

  return (
    <div>
      <div className="header">
        <h1>Showtimes For The Movie</h1>
      </div>
      <h2>Avatar</h2>
      <div className="date-list">
        {weekDates.map(({ date, day }) => (
          <div
            key={date}
            className={`date-item ${date === selectedDate ? 'selected' : ''}`}
            onClick={() => handleDateClick(date)}
          >
            <div>{date}</div>
            <div className="day-name">{day.substring(0, 3)}
            </div>
          </div>
        ))}
      </div>
      <div className={`showtimes ${selectedDate ? 'show' : ''}`}>
        {selectedDate ? (
          showtimesByDate[selectedDate] && showtimesByDate[selectedDate].length > 0 ? (
            <div>
              <h3>Theater A</h3>
              <h4>Showtimes for {selectedDate}</h4>
              <div className="showtime-list">
                {showtimesByDate[selectedDate].map((showtime) => (
                  <div
                    key={showtime}
                    className={`showtime-item ${showtime === selectedShowtime ? 'selected' : ''}`}
                    onClick={() => handleShowtimeClick(showtime)}
                  >
                    {showtime}
                  </div>
                ))}
              </div>
              <button className="continue-button" onClick={handleContinueClick}>
                Continue
              </button>
            </div>
          ) : (
            <div>
              <h3>No Showtime Available</h3>
            </div>
          )
        ) : null}
      </div>
      {/* Alert message popup */}
      <div className={`alert ${alertMessage ? 'show' : ''}`}>
        {alertMessage}
        <button className="close-button" onClick={() => setAlertMessage(null)}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Showtimes;
