import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function Slip() {
  // Get URL parameters
  const { bookingId, seatId, theaterId, price } = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);

    // Send a DELETE request to the server to delete the booking
    fetch(`http://localhost:5101/booking/delete/${bookingId}`, {
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
    <div>
      <h1>Booking Slip</h1>
      <p>Selected Seat IDs: {seatId}</p>
      <p>Theater ID: {theaterId}</p>
      <p>Total Price: {price}</p>

      {isDeleting ? (
        <p>Deleting booking...</p>
      ) : (
        <div>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}

      <Link to="/">
        <button>Update</button>
      </Link>
    </div>
  );
}

export default Slip;
