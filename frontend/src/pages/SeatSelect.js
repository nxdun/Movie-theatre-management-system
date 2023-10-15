import './SeatSelect.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import screenImage from './R.png';
import dolbyImage from './dolby.png';
import unImage from './un.png';
import avImage from './av.png';
import selImage from './sel.png';
import { useNavigate } from 'react-router-dom';
import Header from "../shared/HomeHeader";
import { useLocation } from 'react-router-dom';


function SeatSelect() {
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const movieName = searchParams.get('movieName');
  const theaterName = searchParams.get('theaterName');
  const showtime = searchParams.get('showtime');

  // Define the isSeatBooked function
  const isSeatBooked = (seatId) => bookedSeats.includes(String(seatId));

  // Fetch booked seat data from the server when the component mounts
  useEffect(() => {
    axios.get('/booking/')
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
      bookingDate: new Date(),
      showTime: showtime,
      theaterId: theaterName,
      seatId: selectedButtons.join(', '), // Join selected seat IDs
      price: selectedButtons.length * 1000, // Calculate price based on the number of selected seats
      customerId: 'cus4',
    };

    // Send a POST request to the server to add the booking
    axios.post('/booking/add', bookingData)
      .then((response) => {
        console.log(response.data);

        setSelectedButtons([]);
        
        // Navigate to the slip page and pass seat information as URL parameters
        navigate(`/Slip/${bookingData.seatId}/${theaterName}/${movieName}/${showtime}/${bookingData.price}`);
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
      <Header/>
      <div className="sticky-div">
        <h1>{movieName}</h1>
        <h4>GALAXY CINEMA, Colombo</h4>
        <img src={dolbyImage} alt="screen" border="0" className="dolby" />
        <p className='the1'>{theaterName}</p>
        <p className='the2'>{showtime}</p>
        
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

      <div className="button-container">
        {rows}
      </div><hr />

      <div className='sel-price'>
      <p>{selectedButtons.length} seat(s) selected, Price: Rs.{selectedButtons.length * 1000}</p>   
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