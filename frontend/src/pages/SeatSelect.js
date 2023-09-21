import './SeatSelect.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import screenImage from './R.png';
import locationImage from './loca.png';
import dolbyImage from './dolby.png';
import { useNavigate } from 'react-router-dom';


function SeatSelect() {
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const navigate = useNavigate();

  // Define the isSeatBooked function
  const isSeatBooked = (seatId) => bookedSeats.includes(String(seatId));

  // Fetch booked seat data from the server when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5101/booking/')
      .then((response) => {
        const bookedSeatIds = response.data.map((booking) => booking.seatId);

        const allBookedSeats = bookedSeatIds.flatMap(seatIds => seatIds.split(',').map(id => id.trim()));
        setBookedSeats(allBookedSeats);
        console.log('Fetched booked seats:', allBookedSeats);
      })
      .catch((error) => {
        console.error('Error fetching booked seats:', error);
      });
  }, []);

  const handleButtonClick = (seatId) => {
    const newSelectedButtons = [...selectedButtons];
    const seatIsBooked = isSeatBooked(seatId);

    console.log(`Seat ${seatId} is booked: ${seatIsBooked}`);

    if (seatIsBooked) {
      // Seat is already booked, don't allow selection
      return;
    }

    if (newSelectedButtons.includes(seatId)) {
      newSelectedButtons.splice(newSelectedButtons.indexOf(seatId), 1);
    } else {
      newSelectedButtons.push(seatId);
    }

    setSelectedButtons(newSelectedButtons);
  };

  const handleContinue = () => {
    if (selectedButtons.length === 0) {
      alert('Please select at least one seat before continuing.');
      return;
    }

    // Prepare booking data
    const bookingData = {
      bookingId: 'C14',
      bookingDate: new Date(),
      showTime: '6.00PM',
      theaterId: 'A',
      seatId: selectedButtons.join(', '), // Join selected seat IDs
      price: selectedButtons.length * 1000, // Calculate price based on the number of selected seats
      customerId: 'cus4',
    };

    // Send a POST request to the server to add the booking
    axios.post('http://localhost:5101/booking/add', bookingData)
      .then((response) => {
        console.log(response.data);

        setSelectedButtons([]);
        
        // Navigate to the slip page and pass seat information as URL parameters
        navigate(`/Slip/${bookingData.seatId}/${bookingData.theaterId}/${bookingData.price}`);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Booking failed. Please try again.');
      });
  };

  // Create an array of rows, each containing a row of seats
  const rows = Array.from({ length: 5 }, (_, rowIndex) => (
    <div key={rowIndex} className="seat-row">
      {Array.from({ length: 5 }, (_, seatIndex) => {
        const seatNumber = rowIndex * 5 + seatIndex + 1;
        return (
          <button
            key={seatNumber}
            className={`seat-button ${isSeatBooked(seatNumber) ? 'unavailable' : (selectedButtons.includes(seatNumber) ? 'selected' : 'available')}`}
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
        <img src={locationImage} alt="screen" border="0" className="locIcon" />
        <img src={dolbyImage} alt="screen" border="0" className="dolby" />
      </div>

      <div>
        <img src={screenImage} alt="screen" border="0" className="screen-img" />
      </div>

      <div className="button-container">
        {rows}
      </div>

      <div>
        <button className="continue-button" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default SeatSelect;
