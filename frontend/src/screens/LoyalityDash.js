import Header from "../shared/Header";
import Footer from "../shared/Footer";
import LoyalityControls from "../components/LoyalityControls";
import LoyalityTable from "../components/LoyalityTable";
import "./LoyalityDash.css";
import Popup from "../components/LoyalityPopup";
import { useState } from "react";

const LoyalityDash = () => {
  
  //popup must need constants
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleDeleteRows = () => {
    setRefreshTable(!refreshTable);
  };

 

  return (
    <div>
      <Header />
      <div className="main-container">
        <LoyalityTable refreshTable={refreshTable} onDeleteRows={handleDeleteRows}  className="table-col" delete = {deleteRow} />
        <LoyalityControls  onDelete={handleDeleteRows}  open={openPopup} className="control-col" />
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
