import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/AllMovies.css";
import { handleDelete } from "./DeleteMovie";

export default function AllMovies() {
  const [Movies, setMovies] = useState([]); // Define the state as Movies

  useEffect(() => {
    function getMovies() {
      axios
        .get("http://localhost:8086/Movie/")
        .then((res) => {
          setMovies(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getMovies();
  }, []);

  const onDeleteClick = async (_id) => {
    try {
      await handleDelete(_id);
      // Remove the deleted movie from the state
      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== _id));
    } catch (error) {
      alert(error.message); // Handle the error as needed
    }
  };

  return (
    <div>

      <div className="contA">        
       <a href={'/addMovie'}><button className="button7">Add Movie</button></a>
        <table border="1">
          <tr>
             {/*<th>ID</th>*/}
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
          {/* Map over the Movies state */}
          {Movies.map((i) => {
            return (
              <tr key={i._id}>
                {/*<td>{i._id}</td>*/}
                <td>{i.title}</td>
                <td>{i.genre}</td>
                <td>{i.director}</td>
                <td>{i.releaseDate}</td>
                <td>{i.languages}</td>
                <td>{i.runtime}</td>
                <td>{i.Rating}</td>
                <td><button className="button5" onClick={() => onDeleteClick(i._id)}>Delete</button></td>
                <td><a href={'/updateMovie/' + i._id}><button className="button4">Update</button></a></td>
              </tr>
            );
          })}
        </table>


      </div>
    </div>
  );
}
