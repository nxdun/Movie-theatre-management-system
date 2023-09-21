
import React from 'react';
import "../components/PrivHeader.css";


const Header = () => {
  return (
    <header className="header-main">
      <div className="icon">
        <img
          src="https://via.placeholder.com/150"
          alt="logo"
          className="header-img"
        />
      </div>
      <h1 className="header-h1">PRIVATE SCREENING MANAGEMENT DASHBOARD</h1>
      <div className="button-container-main">
        <button className="login-button">
          <img
            src="https://via.placeholder.com/120"
            alt="logo"
            className="login-img"
          />
          <p className="admin-text">Administrator</p>
        </button>
      </div>
      <div class="button-container">
        <button variant="outlined" className="disable-button" color="secondary">Disable function</button>
        
        <button variant="outlined" className="logout-button">Logout</button>
      </div>
    </header>
  )
};

export default Header;