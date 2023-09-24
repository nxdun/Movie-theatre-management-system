import React from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ViewReport = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle the "Print" button click
  const handlePrintClick = () => {
    // Navigate to the print route
    navigate('/print-report'); // Replace with your actual route for printing
  };

  // Function to handle the "Cancel" button click
  const handleCancelClick = () => {
    // Navigate to the private screen dashboard
    navigate("/privatescreen/dashboard"); // Replace with your actual route
  };

  return (
    <div>
      <div>
        <h2>View Report</h2>
      </div>

      <div>
        <button className="btn btn-primary" onClick={handlePrintClick}>Print</button>
        <button className="btn btn-primary" onClick={handleCancelClick}>Cancel</button>
      </div>
    </div>
  );
};

export default ViewReport;
