import React, { useState } from "react";
import axios from "axios";

export default function AddMovie() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [languages, setLanguages] = useState("");
  const [runtime, setRuntime] = useState("");
  const [Rating, setRating] = useState("");
  const [error, setError] = useState("");

  // Validation function to check if the input is not empty
  const isNotEmpty = (value) => value.trim() !== "";

  // This will execute after clicking the submit button
  function sendData(e) {
    e.preventDefault();

    // Validation
    if (
      !isNotEmpty(title) ||
      !isNotEmpty(genre) ||
      !isNotEmpty(director) ||
      !isNotEmpty(releaseDate) ||
      !isNotEmpty(languages) ||
      !isNotEmpty(runtime) ||
      !isNotEmpty(Rating)
    ) {
      setError("All fields are required");
      return;
    }



    if ( !(Rating <= 5 ))  {
      setError("Enter rating between 0 - 5 ");
      return;
    }

    const newMovie = {
      title,
      genre,
      director,
      releaseDate,
      languages,
      runtime,
      Rating,
    };

    axios
      .post("http://localhost:8086/Movie/addMovie", newMovie)
      .then(() => {
        alert("Movie added");
        // Clear input fields after successful submission
        setTitle("");
        setGenre("");
        setDirector("");
        setReleaseDate("");
        setLanguages("");
        setRuntime("");
        setRating("");
        setError("");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container1">
      <br />
      <br />
      <form onSubmit={sendData}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="genre" className="form-label">
            Genre
          </label>
          <select
            className="form-select"
            id="genre"
            onChange={(e) => {
              setGenre(e.target.value);
            }}
            value={genre}
          >
            <option value="">Select Genre</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Science Fiction">Science Fiction</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="director" className="form-label">
            Director
          </label>
          <input
            type="text"
            className="form-control"
            id="director"
            onChange={(e) => {
              setDirector(e.target.value);
            }}
            value={director}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="releasedate" className="form-label">
            Release Date
          </label>
          <input
            type="date"
            className="form-control"
            id="releasedate"
            aria-describedby="emailHelp"
            onChange={(e) => {
              setReleaseDate(e.target.value);
            }}
            value={releaseDate}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="languages" className="form-label">
            Languages
          </label>
          <select
            className="form-select"
            id="languages"
            onChange={(e) => {
              setLanguages(e.target.value);
            }}
            value={languages}
          >
            <option value="">Select Language</option>
            <option value="English">English</option>
            <option value="Sinhala">Sinhala</option>
            <option value="Tamil">Tamil</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="runtime" className="form-label">
            Runtime
          </label>
          <input
            type="number"
            className="form-control"
            id="runtime"
            onChange={(e) => {
              setRuntime(e.target.value);
            }}
            value={runtime}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rating" className="form-label">
            Rating
          </label>
          <input
            type="number"
            className="form-control"
            id="rating"
            onChange={(e) => {
              setRating(e.target.value);
            }}
            value={Rating}
          />
        </div>

        <div className="text-danger">{error}</div>

        <button type="submit" className="btn2">
          Submit
        </button>
      </form>
    </div>
  );
}
