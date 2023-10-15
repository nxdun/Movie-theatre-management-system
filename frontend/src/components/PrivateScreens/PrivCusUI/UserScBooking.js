import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./UserScBooking.css";
import swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { addPrivateScreenToCart } from "../../../redux/actions/cartActions";

const UserScBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { privscname, privscprice } = location.state;
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
  const [bookingData, setBookingData] = useState({
    movie: "",
    bookingDate: "",
    parking: "",
    email: "",
    otherReqs: "",
    screen: privscname,
    price: privscprice,
    time: "",
    cusName: "",
    mobile: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3013/movie")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setMovies(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching Movie name: ", error);
      });
  }, []);

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
    if (!bookingData.bookingDate) {
      errors.bookingDate = "Booking Date is required";
    } else {
      const selectedDate = new Date(bookingData.bookingDate);
      const currentDate = new Date();
      if (selectedDate < currentDate) {
        errors.bookingDate = "Booking Date cannot be in the past";
      }
    }
    if (
      !bookingData.email.trim() ||
      !/^\S+@\S+\.\S+$/.test(bookingData.email)
    ) {
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
    } else if (!/^\d{3}-\d{7}$/.test(bookingData.mobile)) {
      errors.mobile = "Mobile must be in the format 012-3456789";
    }
    if (!bookingData.parking) {
      errors.parking = "Please select Parking preference";
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
          swal.fire({
            icon: "success",
            title: "Success",
            text: "Booking added to cart successfully!",
          });

          // Create a movie slip object with relevant details
          const privScSlip = {
            product: "", // Use seatId or another identifier
            name: privscname, // Customize as needed
            imageUrl: "", // Provide an image URL if available
            price: privscprice,
            countInStock: 1, // Set the available stock count
            qty: 1, // Set the quantity to 1
          };

          // Dispatch the action to add the movie slip to the cart
          dispatch(addPrivateScreenToCart(privScSlip));

          // Optional: Provide UI feedback to the user
          navigate("/ccc"); // Update the route as needed
        })
        .catch((error) => {
          console.error("Error submitting booking data:", error);
        });
      } else {
        // If there are validation errors, display an error message
        swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Please fill in all the required fields and correct validation errors.",
        });
      }
    };
  return (
    <div className="ggk page-container">
      <div className="ggk booking-container">
        <h1 className="ggk hh1">BOOK PRIVATE SCREEN</h1>
        <form onSubmit={handleSubmit}>
          <div className="ggk form-group">
            <label htmlFor="movie">Movie:</label>
            <select
              name="movie"
              value={bookingData.movie}
              onChange={handleChange}
            >
              <option value="">Select Movie</option>
              {movies.map((movie) => (
                <option key={movie._id} value={movie.title}>
                  {movie.title}
                </option>
              ))}
            </select>

            {errors.movie && <div className="ggk error">{errors.movie}</div>}
          </div>
          <div className="ggk form-group">
            <label htmlFor="screen">Private Screen:</label>
            <input
              type="text"
              name="screen"
              value={bookingData.screen}
              readOnly
            />
          </div>
          <div className="ggk form-group">
            <label htmlFor="price">Price (Rs):</label>
            <input
              type="number"
              name="price"
              value={bookingData.price}
              readOnly
            />
          </div>

          <div className="ggk form-group">
            <label htmlFor="bookingDate">Booking Date:</label>
            <input
              type="date"
              name="bookingDate"
              value={bookingData.bookingDate}
              onChange={handleChange}
            />
            {errors.bookingDate && (
              <div className="ggk error">{errors.bookingDate}</div>
            )}
          </div>

          <div className="ggk form-group">
            <label htmlFor="time">Time:</label>
            <select
              name="time"
              value={bookingData.time}
              onChange={handleChange}
            >
              <option value="">Select Time</option>
              <option value="10:00 AM">10:30 AM</option>
              <option value="1:00 PM">01:00 PM</option>
              <option value="03:30 PM">03:30 PM</option>
              <option value="06:00 PM">06:00 PM</option>
              <option value="08:30 AM">08:30 PM</option>
            </select>
            {errors.time && <div className="ggk error">{errors.time}</div>}
          </div>

          <div className="ggk form-group">
            <label htmlFor="parking">Need Parking Area:</label>
            <select
              name="parking"
              value={bookingData.parking}
              onChange={handleChange}
            >
              <option value="">Select Parking</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.parking && (
              <div className="ggk error">{errors.parking}</div>
            )}
          </div>
          <div className="ggk form-group">
            <label htmlFor="otherReqs">Special Requests:</label>
            <textarea
              name="otherReqs"
              value={bookingData.otherReqs}
              onChange={handleChange}
            />
          </div>

          <div className="ggk form-group">
            <label htmlFor="cusName">Customer Name:</label>
            <input
              type="text"
              name="cusName"
              value={bookingData.cusName}
              onChange={handleChange}
            />
            {errors.cusName && (
              <div className="ggk error">{errors.cusName}</div>
            )}
          </div>

          <div className="ggk form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={bookingData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="ggk error">{errors.email}</div>}
          </div>

          <div className="ggk form-group">
            <label htmlFor="mobile">Mobile:</label>
            <input
              type="text"
              name="mobile"
              value={bookingData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && <div className="ggk error">{errors.mobile}</div>}
          </div>
          <button type="submit" className="ggk submit-button">
            Book Screen
          </button>
          <button
            className="ggk cancel-button"
            onClick={() => navigate("/PrivScUI")} // Use navigate function
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserScBooking;
