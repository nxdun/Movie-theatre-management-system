import React, { useState, useEffect } from "react";
import "./SeatSelect.css";

const SeatSelect = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    // Get the list of seats from the backend API
    // TODO: Implement this function
    // setSeats(res.data);
  }, []);

  const handleSeatSelect = (seat) => {
    if (selectedSeats.includes(seat)) {
      // Unselect the seat
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      // Select the seat
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBookTickets = () => {
    // Send the selected seats to the backend API to book the tickets
    // TODO: Implement this function
  };

  return (
    <div className="seat-select">
      <h1>Seat Selecting System</h1>
      <div className="screen">
        <div className="seats">
          {seats.map((seat) => (
            <div
              key={seat.id}
              className={`seat ${selectedSeats.includes(seat) ? "selected" : ""}`}
              onClick={() => handleSeatSelect(seat)}
            >
              {seat.number}
            </div>
          ))}
        </div>
      </div>
      <div className="booking-actions">
        <button onClick={handleBookTickets}>Book Tickets</button>
      </div>
    </div>
  );
};

export default SeatSelect;
