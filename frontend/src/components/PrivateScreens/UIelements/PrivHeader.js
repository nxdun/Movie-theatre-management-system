import React from 'react';
import './PrivHeader.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="privv-header-main-custom">
      <div className="privv-icon-custom">
        <Link to="/">
        <img
          src="https://raw.githubusercontent.com/nxdun/BlaBla/main/2.png"
          alt="logo"
          className="privv-header-img-custom privv-small-logo"
        />
        </Link>
      </div>

      
      <h1 className="privv-headerr-h1-custom">PRIVATE SCREENING MANAGEMENT DASHBOARD</h1>
    
      <div className="privv-button-container-custom">
      <Link to="/">
        <button variant="outlined" className="privv-logout-button-custom">Logout</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
