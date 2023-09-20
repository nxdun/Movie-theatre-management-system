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

  // Filter the data based on the search input value
  const filteredBookings = bookings.filter((booking) =>
    booking.MovieName.toLowerCase().includes(searchValue.toLowerCase()) ||
    booking.CustomerID.toString().includes(searchValue) ||    
    
  );

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
            <th>BookingID</th>
            <th>CustomerID</th>
            <th>MovieName</th>
            <th>HallID</th>
            <th>SeatID</th>
            <th>Time</th>
            <th>Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking.BookingID}>
              <td>{booking.BookingID}</td>
              <td>{booking.CustomerID}</td>
              <td>{booking.MovieName}</td>
              <td>{booking.HallID}</td>
              <td>{booking.SeatID}</td>
              <td>{booking.Time}</td>
              <td>{booking.Date}</td>
              <td>{booking.Price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SeatManage;
