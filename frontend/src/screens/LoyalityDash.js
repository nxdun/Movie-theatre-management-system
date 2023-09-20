import Header from "../shared/Header";
import Footer from "../shared/Footer";
import LoyalityControls from "../components/LoyalityControls";
import LoyalityTable from "../components/LoyalityTable";
import "./LoyalityDash.css";
import Popup from "../components/LoyalityPopup";
import { useState } from "react";
import axios from "axios";

const LoyalityDash = () => {
  //selected row ids
  const [selectedRowsIds, setSelectedRowsIds] = useState([]);

  //popup must need constants
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };


  const handleDeleteSelectedRows = async () => {
    try {
      // Send a DELETE request to delete the selected rows based on their IDs
      await Promise.all(
        selectedRowsIds.map(async (id) => {
          await axios.delete(`/customer/delete/${id}`);
        })
      );
  
      // Clear the selected rows
      setSelectedRowsIds([]);
  
    } catch (error) {
      console.log("Error deleting rows:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="main-container">
        <LoyalityTable ssetSelectedRowsIds = { setSelectedRowsIds } sselectedRowsIds={ selectedRowsIds } className="table-col" />
        <LoyalityControls
          open={openPopup}
          rowId={selectedRowsIds}
          onDelete={handleDeleteSelectedRows}
          className="control-col"
        />
      </div>
      <div>
        <Popup
          isOpen={isPopupOpen}
          onClose={closePopup}
          content="This is the popup content."
        />
      </div>
    </div>
  );
};

export default LoyalityDash;
