import React, { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [product, setProduct] = useState({
    p_id: "",
    p_name: "",
    p_description: "",
    p_price: "",
    p_quantity: "",
    p_status: "",
    p_createDate: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  }

  function sendData(e) {
    e.preventDefault();
    const newProduct = {
      ...product,
      p_price: parseFloat(product.p_price), // Convert to a number
      p_quantity: parseInt(product.p_quantity), // Convert to an integer
    };
    axios
      .post("http://localhost:8070/product/add", newProduct)
      .then(() => {
        // Show a success message to the user
        console.log("Product Added");
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
        {Object.keys(product).map((key) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>{key.replace(/_/g, " ")}</label>
            <input
              type="text"
              className="form-control"
              id={key}
              name={key}
              placeholder={`Enter ${key.replace(/_/g, " ")}`}
              value={product[key]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button type="button" className="btn btn-primary">
          Cancel
        </button>
      </form>
    </div>
  );
}
 

