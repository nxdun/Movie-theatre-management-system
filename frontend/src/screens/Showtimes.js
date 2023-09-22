// Showtimes.js
import React, { useState } from 'react';
import './Showtimes.css'; // Import the CSS file

const Showtimes = () => {
  // Sample data: showtimes for the week
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

  // Function to generate an array of dates with day names for the week
  const getWeekDates = () => {
    const today = new Date();
    const weekDates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Get the day name
      const options = { weekday: 'long' };
      const dayName = new Intl.DateTimeFormat('en-US', options).format(date);

      weekDates.push({
        date: date.toISOString().split('T')[0],
        dayName: dayName,
      });
    }

    return weekDates;
  };

  // State to keep track of the selected date and showtime
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  // Function to handle date click
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
      //  same showtime is clicked twice, deselect it
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
    } else {

      console.log("Selected Showtime:", selectedShowtime);
    }
  };

  // Generate the array of dates for the week
  const weekDates = getWeekDates();

  return (
    <div>
      <div className="header">
        <h1>Showtimes For The Movie</h1>
      </div>
      <h2>Avatar</h2>
      <div className="date-list">
        {weekDates.map((dateInfo) => (
          <div
            key={dateInfo.date}
            className={`date-item ${dateInfo.date === selectedDate ? 'selected' : ''}`}
            onClick={() => handleDateClick(dateInfo.date)}
          >
            <div className="date-value">{dateInfo.date}</div>
            <div className="day-name">{dateInfo.dayName}</div>
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
    
      <div className={`alert ${alertMessage ? 'show' : ''}`}>
        {alertMessage}
        <button onClick={() => setAlertMessage(null)}>Close</button>
      </div>
    </div>
  );
};

export default Showtimes;
