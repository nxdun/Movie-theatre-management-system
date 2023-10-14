import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../../shared/HomeHeader";
import './CSS/AllMovies.css';

export default function DetailsM() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await axios.get(`/api/movies/${movieId}`); // Replace with your API endpoint
        setMovie(response.data);
        alert(response.data)
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  return (
    <div>
      <Header />
      {movie ? (
        <div>
          <div className="contD">
            <a href="/showtime">
              <button className="button8">Buy Tickets</button>
            </a>
          </div>
          <div className="contn3">
            <h2 className="hh2">Movie Trailer</h2>
          </div>
          <iframe
            className="video"
            width="60%"
            height="500px"
            src={movie.releaseDate} // Use the actual video URL from the movie details
            frameBorder="0"
            allowFullScreen
            title="Movie Trailer"
          ></iframe>

          <h1>{movie._id}</h1>
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
}
