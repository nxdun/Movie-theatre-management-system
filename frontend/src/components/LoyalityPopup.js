import Modal from "react-modal";
import "./LoyalityPopup.css";
import FormCreator from "./LoyalityForm/FormCreator";

const Popup = ({ isOpen, onClose, content }) => {
  return (
    <div className="main-Popup">
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Popup"
        ariaHideApp={false} // This is for prevent accessibility warnings
      >
        <div className="modled-container">
          <h2 className="poptitle">Popup Title</h2>
          <FormCreator/>
          <button className="outside-close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Popup;
