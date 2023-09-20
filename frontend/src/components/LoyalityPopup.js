import Modal from "react-modal";
import "./LoyalityPopup.css";
import FormCreator from "./LoyalityForm/FormCreator";
import FormEditor from "./LoyalityForm/FormEditor";

const Popup = ({ isOpen, onClose, comp }) => {
  return (
    <div className="main-Popup">
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Popup"
        ariaHideApp={false} // This is for prevent accessibility warnings
      >
        <div className="modled-container">
        {comp === "creator" ? <FormCreator /> : <FormEditor />}
          <button className="outside-close-button disable-button" onClick={onClose}>
            X
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Popup;
