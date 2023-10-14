import "./PrivCusHeader.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header class="pri-site-header">
  <div class="pri-site-identity">
  <div className="pri-icon">
    <Link to="/">
  <img src="https://raw.githubusercontent.com/nxdun/BlaBla/main/2.png"
          alt="logo"
          className="pri-header-img"/>
          </Link>
  </div> 
  </div> 
  <nav class="pri-site-navigation">
    <ul class="pri-nav">
      <li><a className="pri-li" href="/">Home</a></li>
      <li><a href="/PrivScUI"><h1 className="pri-headerr-h1-custommm" >PRIVATE SCREENING ROOMS</h1></a></li>
      <li><a className="pri-li" href="#">About</a></li> 
      <li><a className="pri-li" href="#">Contact Us</a></li>
      <li><a className="pri-li login" href="/login">Login</a></li> 
      <li><a className="pri-li manager" href="/manager">Manager</a></li>
      
      
    </ul>
  </nav>
</header>
  );
};

export default Header;
