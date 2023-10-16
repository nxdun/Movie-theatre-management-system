import './SeatManage.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; 

function SeatManage() {
  const [bookings, setBookings] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('/booking')
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Function to handle the search
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

    // Function to determine if a row should be highlighted
  const shouldHighlightRow = (booking) => {
    return (
      (booking.bookingId.toString() || '').includes(searchValue) ||
      (booking.bookingDate || '').toLowerCase().includes(searchValue.toLowerCase()) ||
      (booking.showTime || '').toLowerCase().includes(searchValue.toLowerCase()) ||
      (booking.theaterId || '').toLowerCase().includes(searchValue.toLowerCase()) ||
      (booking.seatId || '').toLowerCase().includes(searchValue.toLowerCase()) ||
      (booking.customerId || '').toLowerCase().includes(searchValue.toLowerCase())
    );
  };


  const generateCSVData = () => {
    // Convert the bookings data to a CSV string
    const csvData = bookings.map((booking) => (
      `${booking.bookingId},${booking.bookingDate},${booking.showTime},${booking.theaterId},${booking.seatId},${booking.price},${booking.customerId}`
    )).join('\n');
  
    // Create a Blob containing the CSV data
    const blob = new Blob([csvData], { type: 'text/csv' });
  
    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);
  
    // Create an anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'booking_report.csv';
  
    // Trigger a click event on the anchor element to start the download
    a.click();
  
    // Clean up the URL object
    window.URL.revokeObjectURL(url);
  };
  

  return (
    <div className="seat-manage">
      <h1>Booking Management</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
      <table className='sm2'>
        <thead>
          <tr >
            <th className='sm1'>Booking ID</th>
            <th className='sm1'>Booking Date</th>
            <th className='sm1'>Show Time</th>
            <th className='sm1'>Theater ID</th>
            <th className='sm1'>Seat ID</th>
            <th className='sm1'>Price</th>
            <th className='sm1'>Customer ID</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.bookingId} className={shouldHighlightRow(booking) ? 'highlighted-row' : ''}>
              <td>{booking.bookingId}</td>
              <td>{booking.bookingDate}</td>
              <td>{booking.showTime}</td>
              <td>{booking.theaterId}</td>
              <td>{booking.seatId}</td>
              <td>{booking.price}</td>
              <td>{booking.customerId}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='sm3' onClick={generateCSVData}>Generate Report</button>
    </div>
  );
}

export default SeatManage;
