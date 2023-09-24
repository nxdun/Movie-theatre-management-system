import React, { useState } from "react";
import axios from "axios";
import './Adv.css';

export default function AddAdvForm() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [type, setType] = useState("");
  //const [error, setError] = useState("");

  const isNotEmpty = (value) => value.trim() !== "";

  // This will execute after clicking the submit button
  function sendData(e) {
    e.preventDefault();

    // Validation
    if (
      !isNotEmpty(name) ||
      !isNotEmpty(description) ||
      !isNotEmpty(startdate) ||
      !isNotEmpty(enddate) ||
      !isNotEmpty(type) 
    ) {
      //setError("All fields are required");
      return;
    }

    const addAdvertisement = {
      name,
      description,
      startdate,
      enddate,
      type,
    };

    axios
      .post("adv/addAdv", addAdvertisement)
      .then(() => {
        alert("Advertisement added");
        // Clear input fields after successful submission
        setName("");
        setDescription("");
        setStartdate("");
        setEnddate("");
        setType("");
      })
      .catch((err) => {
        alert(err);
      });
  
    }
  return (
    <div className="container1">
      <br />
      <br />
      <h2>Add New Advertisement</h2>
      <br />
      <br />
      <form onSubmit={sendData}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
        </div>


        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="startdate" className="form-label">
            Start Date
          </label>
          <input
            type="date"
            className="form-control"
            id="startdate"
            aria-describedby="emailHelp"
            onChange={(e) => {
              setStartdate(e.target.value);
            }}
            value={startdate}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="enddate" className="form-label">
            End Date
          </label>
          <input
            type="date"
            className="form-control"
            id="enddate"
            aria-describedby="emailHelp"
            onChange={(e) => {
              setEnddate(e.target.value);
            }}
            value={enddate}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Type
          </label>
          <input
            type="text"
            className="form-control"
            id="type"
            onChange={(e) => {
              setType(e.target.value);
            }}
            value={type}
          />
        </div>

        <button type="submit" className="btn2">
          Save
        </button>
      </form>
    </div>
  );
}

