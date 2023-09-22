import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';


function Slip() {
  // Get URL parameters
  const { bookingId, seatId, theaterId, price } = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);


    const handleDelete = () => {
      setIsDeleting(true);
    
      // Send a DELETE request to the server to delete the booking using bookingId
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

    const handleUpdateClick = (seatId) => {
      // Assuming you have the seatId value
      navigate(`/Slip/${bookingId}/${seatId}/${theaterId}/${price}`);
    };

    const handleGoToSeatManageClick = () => {
      // Navigate to the SeatManage component
      navigate('/SeatManage');
    };
    

  return (
    <div>
      <h1>Booking Slip</h1>
      <p>Booking ID: {bookingId}</p>
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

      <button onClick={() => handleUpdateClick(seatId)}>Update</button>
      <button onClick={handleGoToSeatManageClick}>Go to SeatManage</button>

    </div>
  );
}

export default Slip;