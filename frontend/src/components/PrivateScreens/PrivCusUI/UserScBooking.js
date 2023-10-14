import React, { useState } from "react";
import axios from "axios";

const UserScBooking = () => {
  const [bookingData, setBookingData] = useState({
    movie: "",
    genre: "",
    bookingDate: "",
    parking: "Yes",
    email: "",
    otherReqs: "",
    screen: "Screen Name",
    price: 100,
    time: "",
    cusName: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!bookingData.movie.trim()) {
      errors.movie = "Movie is required";
    }
    if (!bookingData.genre.trim()) {
      errors.genre = "Genre is required";
    }
    if (!bookingData.bookingDate) {
      errors.bookingDate = "Booking Date is required";
    }
    if (!bookingData.email.trim() || !/^\S+@\S+\.\S+$/.test(bookingData.email)) {
      errors.email = "Valid email is required";
    }
    if (!bookingData.time.trim()) {
      errors.time = "Time is required";
    }
    if (!bookingData.cusName.trim()) {
      errors.cusName = "Customer Name is required";
    }
    if (!bookingData.mobile.trim()) {
      errors.mobile = "Mobile is required";
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(bookingData.mobile)) {
      errors.mobile = "Mobile must be in the format 123-456-7890";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post("http://localhost:3013/private-screens/book", bookingData)
        .then((response) => {
          console.log("Booking data submitted successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error submitting booking data:", error);
        });
    }
  };

  return (
    <div>
      <h1>Book a Screen</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="movie">Movie:</label>
          <input
            type="text"
            name="movie"
            value={bookingData.movie}
            onChange={handleChange}
          />
          {errors.movie && <div className="error">{errors.movie}</div>}
        </div>
        <div>
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            name="genre"
            value={bookingData.genre}
            onChange={handleChange}
          />
          {errors.genre && <div className="error">{errors.genre}</div>}
        </div>
        <div>
          <label htmlFor="bookingDate">Booking Date:</label>
          <input
            type="datetime-local"
            name="bookingDate"
            value={bookingData.bookingDate}
            onChange={handleChange}
          />
          {errors.bookingDate && <div className="error">{errors.bookingDate}</div>}
        </div>
        <div>
          <label htmlFor="parking">Parking:</label>
          <select
            name="parking"
            value={bookingData.parking}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.parking && <div className="error">{errors.parking}</div>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={bookingData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div>
          <label htmlFor="otherReqs">Special Requests:</label>
          <textarea
            name="otherReqs"
            value={bookingData.otherReqs}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="screen">Screen:</label>
          <input
            type="text"
            name="screen"
            value={bookingData.screen}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="price">Price (Rs):</label>
          <input
            type="number"
            name="price"
            value={bookingData.price}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input
            type="text"
            name="time"
            value={bookingData.time}
            onChange={handleChange}
          />
          {errors.time && <div className="error">{errors.time}</div>}
        </div>
        <div>
          <label htmlFor="cusName">Customer Name:</label>
          <input
            type="text"
            name="cusName"
            value={bookingData.cusName}
            onChange={handleChange}
          />
          {errors.cusName && <div className="error">{errors.cusName}</div>}
        </div>
        <div>
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={bookingData.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <div className="error">{errors.mobile}</div>}
        </div>
        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
};

export default UserScBooking;
