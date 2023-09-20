import './LoyalityControls.css'


const LoyalityControls = props => {


    const handleDeleteSelection = () => {
      // Check if there are selected rows before calling onDelete
      if (props.rowId.length > 0) {
        props.onDelete(); // Trigger the onDelete function
        alert("entry/s deleted");
      } else {
        // Handle the case where no rows are selected, e.g., show a message
        alert("No rows selected for deletion.");
      }
    };
      
    return (
        <div className = "btn-container">
            <button className="btn btn-1" >Change rules</button>
            <button className="btn btn-2" onClick={props.open}>Add manually</button>
            <button className="btn btn-3" onClick={props.edit}>EDIT selection</button>
            <button className="btn btn-4" onClick={handleDeleteSelection}>DELETE selection</button>
            <button className="btn btn-5">SHOW LOGS</button>
            <button className="btn btn-6">REVIEW SUBMISSIONS</button>
  
        </div>
    );
};

export default LoyalityControls;