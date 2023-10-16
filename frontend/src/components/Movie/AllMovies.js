import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../../shared/HomeHeader";
import { Link } from "react-router-dom";
import './CSS/AllMovies.css';

import jsPdf from 'jspdf';

export default function AllMovies() {
  const [Movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await axios.get("/movie/");
        setMovies(response.data);
        setFilteredMovies(response.data);
      } catch (error) {
        alert(error.message);
      }
    }
    getMovies();
  }, []);

  const onDeleteClick = async (_id) => {
    try {
      // Implement the handleDelete function or use your logic here to delete the movie.
      // For now, we'll remove it from the filteredMovies only.
      setFilteredMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== _id));
    } catch (error) {
      alert(error.message);
    }
  };

  function generatePdf() {
    // Your PDF generation code.
  }

  const handleSearchInput = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    const filtered = Movies.filter((movie) =>
      movie.title.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredMovies(filtered);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    // You can add code here to handle the search submission, if needed.
  };

  return (
    <div>
      <Header />
      <Link to="/admindash">
        <img
          className="ima4"
          src={"https://www.freeiconspng.com/thumbs/return-button-png/back-undo-return-button-png-5.png"}
          alt="My Image"
          width="50px"
          height="50px"
        />
      </Link>
      <div className="contA">
        <a href={'/addMovie'}>
          <button className="button7">Add Movie</button>
        </a>

        <form onSubmit={handleSearchSubmit} className="search-container">
          <input
            type="text"
            placeholder="Search by Title"
            value={searchInput}
            onChange={handleSearchInput}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>

        <table border="1">
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Director</th>
            <th>Release Date</th>
            <th>Languages</th>
            <th>Runtime</th>
            <th>Rating</th>
            <th></th>
            <th></th>
          </tr>
          {filteredMovies.map((i) => {
            return (
              <tr key={i._id}>
                <td>{i.title}</td>
                <td>{i.genre}</td>
                <td>{i.director}</td>
                <td>{i.releaseDate}</td>
                <td>{i.languages}</td>
                <td>{i.runtime}</td>
                <td>{i.Rating}</td>
                <td>
                  <button className="button5" onClick={() => onDeleteClick(i._id)}>
                    Delete
                  </button>
                </td>
                <td>
                  <a href="#" onClick={() => { /* Handle the click event here */ }}>
                    <button className="button4">Update</button>
                  </a>
                </td>
              </tr>
            );
          })}
        </table>

        <button
          type="button"
          style={{ background: "#2F4FAA" }}
          onClick={function () {
            generatePdf();
          }}
        >   
          <b>Download All details</b>
        </button>

      

      </div>
    </div>
  );
}
