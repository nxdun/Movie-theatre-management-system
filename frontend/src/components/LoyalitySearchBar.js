import "./LoyalitySearchBar.css";
import { Link } from "react-router-dom";
const LoyalitySearchBar = (props) => {
  return (
    <div className="search-bar">
      <Link to = "/admindash">
  <button className="buttooonn buttooon-back" >{"<< back"}</button>
    </Link>
  <form className="search-form">
    <input
      className="search-bar-input"
      type="text"
      placeholder="Search here.."
      name="search"
    />
    <button className="search-submit" type="submit">
    &#x1F50E;&#xFE0E;
    </button>
  </form>

  <div className="buttooon-group">
    <button className="buttooonn buttooon-reset">R</button>
    <button className="buttooonn buttooon-refresh" onClick={props.onRefresh}>
      &#10227;
    </button>
  </div>
</div>

  );
};

export default LoyalitySearchBar;
