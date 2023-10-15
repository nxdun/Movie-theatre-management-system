import React, { useState, useEffect } from "react";
import axios from "axios";
//import "./CSS/AllMovies.css";
import { handleDelete } from "./DeleteMovie";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../../shared/HomeHeader";
import { Link } from "react-router-dom";
import jsPdf from 'jspdf';


export default function AllMovies() {
  const [Movies, setMovies] = useState([]); // Define the state as Movies

  useEffect(() => {
    function getMovies() {
      axios
        .get("/movie/")
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
      alert(error.message); // Handle the error as neededd
    }
  };

  function generatePdf() {

    const unit = "pt"
    const size = "A3"
    const orientation = "portrait"

    const marginLeft = 40;
    const doc = new jsPdf(orientation, unit, size);

    //const imageData = logo



    doc.setFontSize(15);

    const title = "                   Doctor Appoinments Table"

    const headers = [
        ["Doctor", "Patient Name", "Nic", "Contact Details", "Date & Time", "Number", "Status"]
    ];

    const data = Movies.map((rep) => [
        rep.title + " ",
        rep.genre + " ",

        
    ])

    let content = {
        startY: 50,
        head: headers,
        body: data,
    }
    //doc.addImage(imageData, "JPEG", 10, 10, 50, 50);
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("AppoinmentReport.pdf");
    //toast("Item Report Download");

};

  return (
    <div>
     <Header/>
     <Link to="/admindash">
    <img className="ima4" src={"https://www.freeiconspng.com/thumbs/return-button-png/back-undo-return-button-png-5.png"} alt="My Image" width="50px" height= "50px" />
    </Link>
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

        <button type="button" style={{ background: "#2F4FAA" }} onClick={function () { generatePdf() }} ><b>Download All details</b></button>


      </div>
    </div>
  );
}
