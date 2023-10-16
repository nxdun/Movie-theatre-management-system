import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./viewPrivScBookings.css";

const ViewReport = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/private-screens/bookings"); // Adjust the API route accordingly
        setBookings(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  const handlePrintClick = () => {
    // Navigate to the print route (replace with your actual route for printing)
    navigate("/print-report");
  };

  const handleCancelClick = () => {
    // Navigate to the private screen dashboard (replace with your actual route)
    navigate("/privatescreen/dashboard");
  };

  const handleDeleteClick = async (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        const response = await axios.delete(
          `/private-screens/bookings/${bookingId}`
        ); // Adjust the API route accordingly
        if (response.status === 200) {
          // Remove the deleted booking from the state
          setBookings(bookings.filter((booking) => booking._id !== bookingId));
        } else {
          window.alert("Failed to delete the booking. Please try again.");
        }
      } catch (err) {
        console.error(err);
        window.alert("An error occurred while deleting the booking.");
      }
    }
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.cusName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="sldklkfldsd-view-report-container">
      <h2 className="sldklkfldsd-h2">Private Screen Bookings</h2>

      <div>
        <input
          className="sldklkfldsd-search-input"
          type="text"
          placeholder="Search by Customer Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table className="sldklkfldsd-table">
        <thead>
          <tr>
            <th>Movie</th>
            <th>Private Screen</th>
            <th>Price</th>

            <th>Booking Date</th>
            <th>Time</th>
            <th>Parking</th>
            <th>Special Requs.</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.movie}</td>
              <td>{booking.screen}</td>
              <td>{booking.price}</td>

              <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
              <td>{booking.time}</td>
              <td>{booking.parking}</td>
              <td>{booking.otherReqs}</td>
              <td>{booking.cusName}</td>
              <td>{booking.email}</td>
              <td>{booking.mobile}</td>
              <td>
                <button
                  className="sldklkfldsd-delete-button"
                  onClick={() => handleDeleteClick(booking._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="sldklkfldsd-action-buttons">
        <button
          className="sldklkfldsd-print-button"
          onClick={handlePrintClick}
        >
          Print
        </button>
        <button
          className="sldklkfldsd-cancel-button"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ViewReport;
