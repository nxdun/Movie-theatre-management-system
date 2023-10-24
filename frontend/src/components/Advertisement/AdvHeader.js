
import "./AdvHeader.css";
import { Link } from "react-router-dom";


function Header() {


  return (
    <div className="header">
      <div class="site-identity">
        <div className="icon">
          <Link to="/">
        <img src="https://raw.githubusercontent.com/nxdun/BlaBla/main/2.png"
                alt="logo"
                className="header-img"/>
                </Link>
        </div> 
        <ul>
          <li><link to="/HomeAdv">HomeAdv</link></li>
          <li><link to="/adv">Advertisements</link></li>
          <li><link to="/screen">Screen</link></li>
        </ul>
        </div> 
    </div>
  )
    
};

export default Header; 