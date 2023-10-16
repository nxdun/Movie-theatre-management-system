import React, { useState } from "react";
import axios from "axios";

export default function Addstock() {
  const [stock, setStock] = useState({
    p_id: "",
    s_id: "",
    p_quantity: "",
    st_price: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setStock({
      ...stock,
      [name]: value,
    });
  }

  function sendData(e) {
    e.preventDefault();
    const newStock = {
      ...stock,
      p_quantity: parseInt(stock.p_quantity), // Convert to an integer
      st_price: parseFloat(stock.st_price), // Convert to a number
      // P_id: "p0011",
      // s_id: "s0021",
      // P_quantity: "23000",
      // St_price: "20005/=",
      // P_name: "gfh",
      // s_name:"hsj",
      // P_quantity: "23000",
      // st_price: "20005/=",
      // Reorder_level: "2000",
    };

    axios
      .post("http://localhost:3013/stock/add", newStock)
      .then(() => {
        // Show a success message to the user
        console.log("Stock Added");
      })
      .catch((err) => {
        // Show an error message to the user
        console.error(err);
      });
  }

  return (
    <div className="container">
      <form onSubmit={sendData}>
        {/* Render input fields */}
        {Object.keys(stock).map((key) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>{key.replace(/_/g, " ")}</label>
            <input
              type="text"
              className="form-control"
              id={key}
              name={key}
              placeholder={`Enter ${key.replace(/_/g, " ")}`}
              value={stock[key]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
