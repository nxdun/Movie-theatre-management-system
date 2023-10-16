import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./viewPrivScBookings.css";
import jsPDF from "jspdf";

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

  const handleGenerateReport = () => {
    const doc = new jsPDF();
  
    // Add a header to the PDF
    doc.setFontSize(18);
    doc.text("Private Screen Booking Report", 20, 20);
  
    // Add your logo to the PDF (replace 'your_logo_url' with your actual logo URL)
    const logoWidth = 50;
    const logoHeight = 30;
    doc.addImage("https://raw.githubusercontent.com/nxdun/BlaBla/main/1.png", "PNG", 150, 10, logoWidth, logoHeight);


    doc.line(0, 40, doc.internal.pageSize.getWidth() , 40);
  
    // Create an array for table data
    const tableData = [];
  
    // Iterate over your database records and add them to the table
    bookings.forEach((record) => {
      const dataRow = [
        record.screen,
        record.movie,
        record.price,
        record.bookingDate,
        record.time,
        record.cusName,
        record.mobile,


      ];
      tableData.push(dataRow);
    });
  
    // Define table columns
    const columns = ["Private Screen", "movie","Price", "Booking Date", "Time", "Customer Name", "Mobile"];
  
    
    // Add the table to the PDF using jspdf-autotable
    doc.autoTable({
      head: [columns],
      body: tableData,
      startY: 50,
      tableWidth: doc.internal.pageSize.getWidth()-10,
      margin: { left: 5 },
    });
  
    // Save or open the PDF as needed
    doc.save("PrivateScreenBooking.pdf");
  };

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

      <table className="sldklkfldsd-table" id="table-to-print">
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
          onClick={handleGenerateReport}
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
