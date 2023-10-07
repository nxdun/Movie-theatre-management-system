import React from 'react';
import '../components/PrivHeader.css';

const Header = () => {
  return (
    <header className="header-main-custom">
      <div className="icon-custom">
        <img
          src="https://raw.githubusercontent.com/nxdun/BlaBla/main/2.png"
          alt="logo"
          className="header-img-custom"
        />
      </div>
      <h1 className="headerr-h1-custom">PRIVATE SCREENING MANAGEMENT DASHBOARD</h1>
      <div className="button-container-main-custom">
        <button className="login-button-custom">
          <img
            src="https://via.placeholder.com/120"
            alt="logo"
            className="login-img-custom"
          />
          <p className="admin-text-custom">Administrator</p>
        </button>
      </div>
      <div className="button-container-custom">
        <button variant="outlined" className="logout-button-custom">Logout</button>
      </div>
    </header>
  );
};

export default Header;
