import React from "react";
import "./sidePanelBtns.css";
import { useNavigate } from "react-router-dom";

const SidePnlBtns = () => {
  const navigate = useNavigate();
  return (

  <div className="btn-container">

      <button className='btn 01' onClick={() => navigate("/privateScreen/Addroom")}>
        Add Private Room
      </button>     
        
        <button className='btn 03' onClick={() => navigate("/privateScreen/Reviewbooking")}>
          Review Screen Bookings</button>
        <button className='btn 04' onClick={() => navigate("/privateScreen/Viewbookingreport")}>
          Generate Report</button>



  </div>
  
  )
};



export default SidePnlBtns;