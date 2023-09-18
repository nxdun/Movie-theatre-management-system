import React from "react";
import "../styles/sidePanelBtns.css";
import { useNavigate } from "react-router-dom";

const SidePnlBtns = () => {
  const navigate = useNavigate();
  return (

  <div className="btn-container">

      <button className='btn 01' onClick={() => navigate("/add-room")}>
        Add Private Room
      </button>     
        
        <button className='btn 03' onClick={() => navigate("/review-booking")}>
          Review Screen Bookings</button>
        <button className='btn 04' onClick={() => navigate("/view-report")}>
          Generate Report</button>



  </div>
  
  )
};



export default SidePnlBtns;