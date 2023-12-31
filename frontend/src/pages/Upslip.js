import './Upslip.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../shared/HomeHeader";
import { useDispatch } from 'react-redux';
import { addMovieSlipToCart } from '../redux/actions/cartActions';
import Swal from 'sweetalert2';

function Upslip() {
  // Get URL parameters
  const { selectedSeats : seatId, theaterName, movieName, showtime, totalPrice:price } = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  
  const dispatch = useDispatch();



  useEffect(() => {
    if (!seatId) {
      return;
    }
    // Fetch booking data using seatId to get bookingId
    fetch(`/booking/seat/${seatId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.bookingId) {
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
    fetch(`/booking/delete/${seatId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Booking Deleted Successfully",          
          });
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

  const handleAddToCart = () => {
    // Create a movie slip object with relevant details
    const movieSlip = {
      product: seatId, // Use seatId or another identifier
      name: movieName, // Customize as needed      
      price: price,
      countInStock: 1, // Set the available stock count
      qty: 1, // Set the quantity to 1
    };

    // Dispatch the action to add the movie slip to the cart
    dispatch(addMovieSlipToCart(movieSlip));
    Swal.fire({
      icon: "success",
      title: "Booking Added To Cart Successfully!",          
    });

    // Optional: Provide UI feedback to the user
    navigate('/ccc'); // Update the route as needed

  };

  return (
    <div>
      <Header/>
      
    <div className="slip-container">
      <div className="bill-detailss">
        <p className='aaaa'>{movieName}</p>
        <p className='bbbb'>GALAXY CINEMA, Colombo</p>        
        <p>Show Time: {showtime}</p>
        <p>Selected Seat IDs: {seatId}</p>
        <p>{theaterName}</p>
        <p>Total Price: Rs.{price}</p>
      </div>

      {isDeleting ? (
        <p className="deleting">Deleting booking...</p>
      ) : (
        <div className="action-buttons">
          <button className="buttonx" onClick={handleDelete}>
            Delete
          </button>
          <button className="buttonx" onClick={handleAddToCart}>Continue</button>
        </div>
      )}
    </div>
    </div>
  );
}

export default Upslip;
