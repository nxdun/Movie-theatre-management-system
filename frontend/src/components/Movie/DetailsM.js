import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../../shared/HomeHeader";
import "./CSS/AllMovies.css";
import "./CSS/DetailM.css";
import "jspdf-autotable";
import { Link } from "react-router-dom";

export default function DetailsM() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await axios.get(`/movie/getOne/` + movieId); // Replace with your API endpoint
        setMovie(response.data);
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
            <Link to={`/showtime/${movieId}`}>
              <button className="button85">Buy Tickets</button>
                 
            </Link>
          </div>
          <div className="contn3">
            <h2 className="hh2">Movie Trailer</h2>
          </div>
          

          <img
            className="ima2"
            src={movie.director}
            alt="Movie Poster"
            width="95%"
            height="100%"
          />
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
         
    </div>
  );
}

