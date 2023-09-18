import Header from "../shared/Header";
import Footer from "../shared/Footer";
import LoyalityControls from "../components/LoyalityControls";
import LoyalityTable from "../components/LoyalityTable";
import { useState } from "react";
import "./LoyalityDash.css";
import Popup from "../components/LoyalityPopup";

const LoyalityDash = () => {
  //popup must need constants
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <Header />
      <div className="main-container">
        <LoyalityTable className="table-col" />
        <LoyalityControls open = {openPopup} className="control-col" />
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
