import React, { useState, useEffect } from "react";
import "./Showtimes.css";
import { useNavigate } from "react-router-dom";
import Header from "../shared/HomeHeader";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const Showtimes = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [showtimes, setShowtimes] = useState([]);
  const [theaterName, setTheaterName] = useState("");
  const [filmName, setmovname] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
  const { movieNM } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch movie data from the API
        const response = await axios.get("/admin/getallMovieShedularDetails");

        if (response.data && Array.isArray(response.data.data)) {
          const movieListFromDB = response.data.data;

          // Create a new list of objects
          const movieOptions = movieListFromDB.map((movie) => ({
            label: movie.MovieName,
            value: movie.MovieId,
            stime: movie.ShowTime,
            startDate: movie.StartDate,
            endDate: movie.EndDate,
            tname: movie.TheaterName,
          }));
          // Set the 'movies' list with properties
          setMovies(movieOptions);

          setDataFetched(true);

          if (movieNM && dataFetched) {
            // Preselect the movie based on URL
            const selectedMovieData = movieOptions.find(
              (movie) => movie.value === movieNM
            );
            if (selectedMovieData) {
              setSelectedMovie(selectedMovieData.value);
            }
          }
        } else {
          console.error(
            "Failed to fetch movie data or data format is incorrect"
          );
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchData();
  }, [movieNM, dataFetched]);

  useEffect(() => {
    if (selectedMovie && dataFetched) {
      // Handle movie change and associated data population
      handleMovieChange(selectedMovie);
    }
  }, [selectedMovie, dataFetched]);

  const handleMovieChange = (movieId) => {
    setSelectedMovie(movieId);

    // Find the selected movie based on its ID
    const selectedMovieData = movies.find((movie) => movie.value === movieId);
    if (selectedMovieData) {
      // Generate the available dates and showtimes for the selected movie
      const availableDates = [];
      const showtimesByDate = {};

      const startDate = new Date(selectedMovieData.startDate);
      const endDate = new Date(selectedMovieData.endDate);
      const showTime = selectedMovieData.stime;
      setTheaterName(selectedMovieData.tname);
      setmovname(selectedMovieData.label);

      while (startDate <= endDate) {
        const dateStr = startDate.toISOString().split("T")[0];
        availableDates.push(dateStr);
        showtimesByDate[dateStr] = [showTime];
        startDate.setDate(startDate.getDate() + 1);
      }

      setShowtimes(showtimesByDate);
    }
  };

  // get dates; starting from today, along with day names
  const getWeekDates = () => {
    const today = new Date();
    const offset = 330 * 60 * 1000;
    const todayWithOffset = new Date(today.getTime() + offset);
    const weekDates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(todayWithOffset);
      date.setDate(todayWithOffset.getDate() + i);
      const dateString = date.toISOString().split("T")[0];
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" }); // Get the day name
      weekDates.push({ date: dateString, day: dayName });
    }

    return weekDates;
  };

  const weekDates = getWeekDates();

  const [selectedDate, setSelectedDate] = useState(weekDates[0]?.date || null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  // handle date click
  const handleDateClick = (date) => {
    if (date === selectedDate) {
      setSelectedDate(null);
      setSelectedShowtime(null);
    } else {
      setSelectedDate(date);
    }
  };

  // Function to handle showtime click
  const handleShowtimeClick = (showtime) => {
    if (showtime === selectedShowtime) {
      // If the same showtime is clicked twice, deselect it
      setSelectedShowtime(null);
    } else {
      setSelectedShowtime(showtime);
    }
  };

  const handleContinueClick = () => {
    if (!selectedShowtime) {
      // If no showtime is selected, show an alert
      Swal.fire({
        icon: "warning",
        title: "Oops... You haven't selected Showtime!",
        text: "Please select a Showtime",
      });
    } else {
      // Navigate to the seat booking page
      const url = `/seatbooking?movieName=${filmName}&theaterName=${theaterName}&showtime=${selectedShowtime}`;
      navigate(url);
    }
  };

  return (
    <div>
      <Header />
      <div className="movie-dropdown">
        <select
          value={selectedMovie}
          onChange={(e) => handleMovieChange(e.target.value)}
        >
          <option value="">Select a movie</option>
          {movies.map((movie) => (
            <option key={movie.value} value={movie.value}>
              {movie.label}
            </option>
          ))}
        </select>
      </div>
      <div className="date-list">
        {weekDates.map(({ date, day }) => (
          <div
            key={date}
            className={`date-item ${date === selectedDate ? "selected" : ""}`}
            onClick={() => handleDateClick(date)}
          >
            <div>{date}</div>
            <div className="day-name">{day.substring(0, 3)}</div>
          </div>
        ))}
      </div>
      <div className={`showtimes ${selectedDate ? "show" : ""}`}>
        {selectedDate ? (
          showtimes[selectedDate] && showtimes[selectedDate].length > 0 ? (
            <div>
              <h3 className="th-nm">{theaterName}</h3>
              <h4 className="show-nm"> Showtime for {selectedDate}</h4>
              <div className="showtime-list">
                {showtimes[selectedDate].map((showtime) => (
                  <div
                    key={showtime}
                    className={`showtime-item ${
                      showtime === selectedShowtime ? "selected" : ""
                    }`}
                    onClick={() => handleShowtimeClick(showtime)}
                  >
                    {showtime}
                  </div>
                ))}
              </div>
              <button className="continue-button" onClick={handleContinueClick}>
                Continue
              </button>
            </div>
          ) : (
            <div>
              <h3 className="No-sta">No Showtime Available</h3>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Showtimes;
