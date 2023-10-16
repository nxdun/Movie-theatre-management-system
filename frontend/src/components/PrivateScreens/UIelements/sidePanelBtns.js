import React from "react";
import "./sidePanelBtns.css";
import { useNavigate } from "react-router-dom";

const SidePnlBtns = () => {
  const navigate = useNavigate();
  return (

    <div className="btnn-container">
    <button className="btnn btn01" onClick={() => navigate("/privateScreen/Addroom")}>
      Add Private Room
    </button>
    <button className="btnn btn03" onClick={() => navigate("/privateScreen/Reviewbooking")}>
      Review Screen Bookings
    </button>
   
  </div>
);
};



export default SidePnlBtns;