import './Slip.css'; 
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import dolbyImage from './dolby.png';

function Slip() {
  // Get URL parameters
  const { seatId, theaterId, price } = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  const handleGoToSeatManageClick = () => {
    navigate('/SeatManage'); 
  };


  useEffect(() => {
    if (!seatId) {
      return;
    }
    // Fetch booking data using seatId to get bookingId
    fetch(`http://localhost:5101/booking/seat/${seatId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.bookingId) { // Changed from data.BookingIdId to data.bookingId
          setBookingId(data.bookingId);
        }
      })
      .catch((error) => {
        console.error('Error fetching booking:', error);
      });
  }, [seatId]);

  const handleDelete = () => {
    setIsDeleting(true);

    // Send a DELETE request to the server to delete the booking using seatId
    fetch(`http://localhost:5101/booking/delete/${seatId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          // Booking deleted successfully, navigate back to SeatSelect
          navigate('/');
        } else {
          // Handle error here, show an error message
          console.error('Error deleting booking:', response.statusText);
          setIsDeleting(false);
        }
      })
      .catch((error) => {
        console.error('Error deleting booking:', error);
        setIsDeleting(false);
      });
  };

  return (

    
    <div className="slip-container">
      <div className="sticky-div">
        <h1>AVATAR 2</h1>
        <h4>GALAXY CINEMA, Colombo</h4>
        <img src={dolbyImage} alt="screen" border="0" className="dolby" />
      </div>
      
      <p className="seat-id">Selected Seat IDs: {seatId}</p>
      <p>Theater ID: {theaterId}</p>
      <p>Total Price: {price}</p>

      {isDeleting ? (
        <p className="deleting">Deleting booking...</p>
      ) : (
        <div>
          <button className="buttonx" onClick={handleDelete}>Delete</button>
        </div>
      )}

      <Link to={`/SeatUpdate/${bookingId}/${seatId}`} className="buttonx">Add more seats</Link>
      <button className="buttonx" onClick={() => handleGoToSeatManageClick()}>Go to SeatManage</button>
    </div>
  );
}

export default Slip;
