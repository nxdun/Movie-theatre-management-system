import Modal from "react-modal";
import "./LoyalityPopup.css";
import FormCreator from "./LoyalityForm/FormCreator";
import FormEditor from "./LoyalityForm/FormEditor";
import LoyalityRuler from "./LoyalityForm/LoyalityRuler";

const Popup = ({ isOpen, onClose, comp, d }) => {
  let componentToRender;
  switch (comp) {
    case "creator":
      componentToRender = <FormCreator />;
      break;
    case "editor":
      componentToRender = <LoyalityRuler />;
      break;
    default:
      componentToRender = <FormEditor e={d} close={onClose} />;
      break;
  }

  return (
    <div className="main-Popup">
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Popup"
        ariaHideApp={false} // This is for prevent accessibility warnings
      >
        <div className="modled-container">
          {componentToRender}
          <button
            className="outside-close-button disable-button"
            onClick={onClose}
          >
            X
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Popup;
