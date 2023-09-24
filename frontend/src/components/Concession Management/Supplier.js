import React, { useState } from "react";
import axios from "axios";

export default function Supplier() {
  const [s_id, sets_id] = useState("");
  const [s_name, sets_name] = useState("");
  const [s_address, sets_address] = useState("");
  const [s_email, sets_email] = useState("");
  const [s_status, sets_status] = useState("");
  const [s_createDate, sets_createDate] = useState("");

  function sendData(e) {
    e.preventDefault();
    const newSupplier = {
      s_id,
      s_name,
      s_address,
      s_email,
      s_status,
      s_createDate,
    };
    axios
      .post("http://localhost:8070/supplier/add", newSupplier)
      .then(() => {
        alert("Supplier Added");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container">
      <form onSubmit={sendData}>
        <div className="form-group">
          <label htmlFor="s_id">Supplier ID</label>
          <input
            type="text"
            className="form-control"
            id="s_id"
            placeholder="Enter Supplier ID"
            value={s_id}
            onChange={(e) => {
              sets_id(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="s_name">Supplier Name</label>
          <input
            type="text"
            className="form-control"
            id="s_name"
            placeholder="Enter Supplier Name"
            value={s_name}
            onChange={(e) => {
              sets_name(e.target.value);
            }}
          />
        </div>

        {/* Include similar code for other input fields */}

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
