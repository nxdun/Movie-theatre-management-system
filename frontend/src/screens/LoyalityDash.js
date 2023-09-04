import Header from "../shared/Header";
import Footer from "../shared/Footer";
import LoyalityControls from "../components/LoyalityControls";
import LoyalityTable from "../components/LoyalityTable";
import "./LoyalityDash.css";

const LoyalityDash = () => {

  return (
    <div>
      <Header />
      <div className="main-container">
        <LoyalityTable className="table-col"  />
        <LoyalityControls className="control-col" />
      </div>
    </div>
  );
};

export default LoyalityDash;
