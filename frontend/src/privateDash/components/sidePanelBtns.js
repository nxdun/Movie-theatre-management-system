import React from "react";
import { Link } from "react-router-dom";

const sidePnlBtns = () => {
  return (

  <div className="btn-container">

<button className='btn 01'>
        <Link to="/add-room">Add Private Room</Link>
      </button>

       
        <button className='btn 02'>Manage Room Benefits</button>
        <button className='btn 03'>Review Screen Bookings</button>
        <button className='btn 04'>Generate Report</button>



  </div>
  
  )
};



export default sidePnlBtns;