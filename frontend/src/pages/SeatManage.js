import './SeatManage.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx'; 

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


  // Function to generate Excel data
  const generateExcelData = () => {
    const data = bookings.map((booking) => ({
      'Booking ID': booking.bookingId,
      'Booking Date': booking.bookingDate,
      'Show Time': booking.showTime,
      'Theater ID': booking.theaterId,
      'Seat ID': booking.seatId,
      'Price': booking.price,
      'Customer ID': booking.customerId,
    }));

    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(data);

    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'BookingData');

    // Generate a blob containing the Excel data
    XLSX.write(wb, { bookType: 'xlsx', type: 'blob' }, (blob) => {
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create an anchor element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'booking_report.xlsx';

      // Trigger a click event on the anchor element to start the download
      a.click();

      // Clean up the URL object
      window.URL.revokeObjectURL(url);
    });
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
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Booking Date</th>
            <th>Show Time</th>
            <th>Theater ID</th>
            <th>Seat ID</th>
            <th>Price</th>
            <th>Customer ID</th>
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
      <button onClick={generateExcelData}>Generate Report</button>
    </div>
  );
}

export default SeatManage;
