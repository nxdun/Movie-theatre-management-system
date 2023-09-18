import './LoyalityControls.css'

const LoyalityControls = props => {
    return (
        <div className = "btn-container">
            <button className="btn btn-1" >Change rules</button>
            <button className="btn btn-2" onClick={props.open}>Add manually</button>
            <button className="btn btn-3">EDIT selection</button>
            <button className="btn btn-4">DELETE selection</button>
            <button className="btn btn-5">SHOW LOGS</button>
            <button className="btn btn-6">REVIEW SUBMISSIONS</button>
  
        </div>
    );
};

export default LoyalityControls;