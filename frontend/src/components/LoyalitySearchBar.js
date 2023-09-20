import "./LoyalitySearchBar.css";

const LoyalitySearchBar = (props) => {
  return (
    <div className="search-bar">
      <button className="buttonn button-back">{"<< back"}</button>

      <select className = "buttonn select-search">
        <option value="">Select Column</option>
        <option value="column1">Column 1</option>
        <option value="column2">Column 2</option>
      </select>

      <form className="search-form">
        <input
          className="buttonn search-bar"
          type="text"
          placeholder="Search.."
          name="search"
        />
        <input className="buttonn search-submit" type="submit" value="Search" />
      </form>

      <button className="buttonn button-filter">&#128854;</button>
      <button className="buttonn button-reset">R</button>
      <button className="buttonn button-refresh"  onClick={props.onRefresh}>&#10227;</button>
    </div>
  );
};

export default LoyalitySearchBar;
