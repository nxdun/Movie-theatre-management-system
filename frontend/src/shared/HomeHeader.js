import "./HomeHeader.css";
import { Link } from "react-router-dom";
import Search from "../components/Movie/Search";
const Header = () => {
  return (
    <header class="site-header">
  <div class="site-identity">
  <div className="icon">
    <Link to="/">
  <img src="https://raw.githubusercontent.com/nxdun/BlaBla/main/2.png"
          alt="logo"
          className="header-img"/>
          </Link>
  </div> 
  </div> 
  <nav class="site-navigation">
    <ul class="nav">
      <li><a className="li" href="/">Home</a></li>
      <li><a className="li" href="/PrivScUI">Private Screens</a></li>
      <li><a className="li" href="#">About</a></li> 
      <li><a className="li" href="#">Contact Us</a></li>
      <li><Search /></li>
      <li><a className="li" href="/login">Log in</a></li>
      
      
    </ul>
  </nav>
</header>
  );
};

export default Header;
