import './SeatUpdate.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import screenImage from './R.png';

import dolbyImage from './dolby.png';
import { useParams } from 'react-router-dom';

function SeatUpdate() {
  const { bookingId, seatId: gotSeatId } = useParams(); // Get URL parameters
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Define the isSeatAlreadyBooked function
  const isSeatAlreadyBooked = (seatId) => bookedSeats.includes(String(seatId));

  // Fetch booked seat data from the server when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:5101/booking/')
      .then((response) => {
        const bookedSeatIds = response.data.map((booking) => booking.seatId);
        setBookedSeats(bookedSeatIds.join(',')); // Store booked seats as a comma-separated string
        console.log('Fetched booked seats:', bookedSeatIds);

        if (gotSeatId && !selectedSeats.includes(Number(gotSeatId))) {
          setSelectedSeats([...selectedSeats, Number(gotSeatId)]);
        }
      })
      .catch((error) => {
        console.error('Error fetching booked seats:', error);
      });
  }, []);

  const handleButtonClick = (seatId) => {
    const seatIsBooked = isSeatAlreadyBooked(seatId);

    console.log(`Seat ${seatId} is booked: ${seatIsBooked}`);

    if (seatIsBooked) {
      // Seat is already booked, don't allow selection
      return;
    }

    const newSelectedSeats = [...selectedSeats];

    if (newSelectedSeats.includes(seatId)) {
      // If the seat is already selected, unselect it
      const index = newSelectedSeats.indexOf(seatId);
      newSelectedSeats.splice(index, 1);
    } else {
      // If the seat is available, select it
      newSelectedSeats.push(seatId);
    }

    setSelectedSeats(newSelectedSeats);
  };

  const calculateTotalPrice = () => {
    // Assuming the price per selected seat is 1000
    return selectedSeats.length * 1000;
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat before continuing.');
      return;
    }

    const totalPrice = calculateTotalPrice();

    // Prepare the data to send in the Axios POST request
    const postData = {
      seatId: selectedSeats.join(','), // Selected seat IDs
      price: totalPrice, // Total price
    };

        console.log('bookingId:', bookingId);
        console.log('selectedSeats:', selectedSeats);
        console.log('gotSeatId:', gotSeatId);

        console.log('totalPrice:', totalPrice);


    // Send the data in the POST request
    axios
      .put(`http://localhost:5101/booking/update/${bookingId}`, postData)
      .then((response) => {
        console.log(response.data);

        setSelectedSeats([]); // Clear selected seats after booking
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Booking failed. Please try again.');
      });
  };

  // Create an array of rows, each containing a row of seats
  const rows = Array.from({ length: 6 }, (_, rowIndex) => (
    <div key={rowIndex} className="seat-row">
      {Array.from({ length: 5 }, (_, seatIndex) => {
        const seatNumber = rowIndex * 5 + seatIndex + 1;
        const isSeatBooked = isSeatAlreadyBooked(seatNumber);
        const isSelected =
          seatNumber.toString() === gotSeatId || selectedSeats.includes(seatNumber);

        return (
          <button
            key={seatNumber}
            className={`seat-button ${
              isSeatBooked ? 'unavailable' : isSelected ? 'selected' : 'available'
            }`}
            onClick={() => handleButtonClick(seatNumber)}
          >
            Seat {seatNumber}
          </button>
        );
      })}
    </div>
  ));

  return (
    <div>
      <div className="sticky-div">
        <h1>AVATAR 2</h1>
        <h4>GALAXY CINEMA, Colombo</h4>
        <h3>Update Seats</h3>
        
        <img src={dolbyImage} alt="screen" border="0" className="dolby" />
      </div>

      <div><h2>Your seats: {selectedSeats}</h2></div>

      <div>
        <img src={screenImage} alt="screen" border="0" className="screen-img" />
      </div>

      <div className="button-container">{rows}</div>

      <div>
        <button className="continue-button" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default SeatUpdate;
