import React, { useEffect, useState } from "react";
import "./Adv.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
//import Advertisement from "./Advertisement";
//import AdvHeader from "./AdvHeader";

const Advertisements = () => {
  const navigate = useNavigate();
  const [advertisements, setAdvertisements] = useState([]);


  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await axios.get("/api/advertisements/");
        setAdvertisements(response.data);
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      }
    };

    fetchAdvertisements();
  }, []);


  const [input, setInput] = useState("");

  const onSearch = (searchTerm) => {
    console.log("Search", searchTerm);
  };

  const handleDelete = async (advertisement) =>{
    try {
      setAdvertisements(advertisements.filter(a=> a._id !== advertisement._id));

      await axios.delete(`/api/advertisements/${advertisement._id}`)
      alert("Advertisement Deleted Successfully !");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (

     <div className="advertisements"> 
      <br></br>
      <div className="container">
      <h2>Advertisements</h2>
      <br></br>
      <div className="search-wrapper">
      
            <input 
            type="text"
            className="search" 
            placeholder="Search ..."
            value={input}
            onChange={(e) => setInput(e.target.value)}/>
            <button className="button4" type="submit" color="dark"
            onClick={() => onSearch(input)}>
          {/* <img src={"./search.png"} /> */}
          Search</button>
   
      </div>
      <br></br>
        <button onClick={() => navigate(`/adv/new`)} className="button2">
          Add New Advertisement
        </button>
        <br></br>
        <br></br>


        <table className="tb-kalmi">
          <thead>
            <tr>
              <th>Title</th>
              <th className="expand">Description</th>
              <th>Startdate</th>
              <th>Enddate</th>
              <th>Type</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {advertisements.map((advertisement) => (
              <tr key={advertisement._id}>
                <td> {advertisement.name} </td>
                <td> {advertisement.description} </td>
                <td> {advertisement.startdate} </td>
                <td> {advertisement.enddate} </td>
                <td> {advertisement.type} </td>
                <td>
                  <Link
                  to={`/adv/update/${advertisement._id}`}
                    //onClick={() => navigate(`/api/advertisements/${advertisement._id}`)}
                    className="button1"
                  >
                    Update
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(advertisement)}
                    className="button3">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
  );
};

export default Advertisements;
