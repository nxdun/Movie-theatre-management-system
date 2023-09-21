import React from 'react';
import { useParams } from 'react-router-dom';

function Slip() {
  // Get URL parameters
  const { seatId, theaterId, price } = useParams();

  return (
    <div>
      <h1>Booking Slip</h1>
      <p>Selected Seat IDs: {seatId}</p>
      <p>Theater ID: {theaterId}</p>
      <p>Total Price: {price}</p>
     
    </div>
  );
}

export default Slip;
