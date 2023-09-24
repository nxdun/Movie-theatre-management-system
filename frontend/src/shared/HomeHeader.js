import "./HomeHeader.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header class="site-header">
  <div class="site-identity">
  <div className="icon">
    <Link to="/Home">
  <img src="https://raw.githubusercontent.com/nxdun/BlaBla/main/1.png"
          alt="logo"
          className="header-img"/>
          </Link>
  </div> 
  </div> 
  <nav class="site-navigation">
    <ul class="nav">
      <li><a href="#">About</a></li> 
      <li><a href="#">News</a></li> 
      <li><a href="#">Contact</a></li> 
    </ul>
  </nav>
</header>
  );
};

export default Header;
