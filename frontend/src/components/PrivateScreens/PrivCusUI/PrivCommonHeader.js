import "./PrivCommonHeader.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header class="privvv-site-header">
      <div class="privvv-site-identity">
        <div className="privvv-icon">
          <Link to="/">
            <img
              src="https://raw.githubusercontent.com/nxdun/BlaBla/main/2.png"
              alt="logo"
              className="priv-header-img"
            />
          </Link>
        </div>
      </div>
      <nav class="privvv-site-navigation">
        <ul class="privvv-nav">
          <li>
            <a href="/PrivScUI">
              <h1 className="privvv-headerr-h1-custommm">
                PRIVATE SCREENING ROOMS
              </h1>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
