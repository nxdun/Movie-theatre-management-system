import './SeatUpdate.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import screenImage from './R.png';
import dolbyImage from './dolby.png';
import unImage from './un.png';
import avImage from './av.png';
import selImage from './sel.png';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../shared/HomeHeader";

function SeatUpdate() {
  const { bookingId, seatId: gotSeatId, theaterName, movieName, showtime } = useParams(); // Get URL parameters
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  // Define the isSeatAlreadyBooked function
  const isSeatAlreadyBooked = (seatId) => bookedSeats.includes(String(seatId));
 
  // Fetch booked seat data from the server when the component mounts
  useEffect(() => {
    axios
      .get('/booking/')
      .then((response) => {
        const bookedSeatIds = response.data.map((booking) => booking.seatId);
        setBookedSeats(bookedSeatIds.join(',')); // Store booked seats as a comma-separated string
        console.log('Fetched booked seats:', bookedSeatIds);
  
        if (gotSeatId) {
          // Convert gotSeatId to an array of strings
          const selectedSeatIds = gotSeatId.split(',');
  
          // Filter out seat IDs that are already booked
          const newSelectedSeats = selectedSeatIds
            .map(Number)
            .filter((seatId) => !isSeatAlreadyBooked(seatId));
  
          // Remove duplicates by converting the array to a Set and back to an array
          setSelectedSeats((prevSelectedSeats) => [
            ...new Set([...prevSelectedSeats, ...newSelectedSeats])
          ]);
        }
      })
      .catch((error) => {
        console.error('Error fetching booked seats:', error);
      });
  }, [gotSeatId]);
  
  
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
        console.log('totalPrice:', totalPrice);


    // Send the data in the POST request
    axios
      .put(`/booking/update/${bookingId}`, postData)
      .then((response) => {
        console.log(response.data);

        setSelectedSeats([]); // Clear selected seats after booking
        navigate(`/Upslip/${selectedSeats}/${theaterName}/${movieName}/${showtime}/${totalPrice}`);
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
      <Header/>
      <div className="sticky-div">
      <h1>{movieName}</h1>
        <h4>GALAXY CINEMA, Colombo</h4>
        <img src={dolbyImage} alt="screen" border="0" className="dolby" />
        <p className='the1'>{theaterName}</p>
        <p className='the2'>{showtime}</p>
        
        <img src={dolbyImage} alt="screen" border="0" className="dolby" />
      </div>

      <div>
        <img src={screenImage} alt="screen" border="0" className="screen-img" />
        <p className="screenWay">↑ SCREEN THIS WAY</p>
      </div>

      <div className='d-icon'>
      <img src={avImage} alt="Buttonimage" border="0" className="av" /><p>Available&nbsp;&nbsp;&nbsp;&nbsp;</p>
      <img src={unImage} alt="Buttonimage" border="0" className="av" /><p>Unavailable&nbsp;&nbsp;&nbsp;&nbsp;</p>
      <img src={selImage} alt="Buttonimage" border="0" className="av" /><p>Selected</p>

      </div>

      <div className="button-container">{rows}</div><hr />

      <div className='sel-price'>
      <p>Your seat(s): {selectedSeats.join(', ')}<br />
      {selectedSeats.length} seat(s) selected, Price: Rs.{selectedSeats.length * 1000}</p>   
      </div>

      <div>
        <button className="continue-button" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default SeatUpdate;
