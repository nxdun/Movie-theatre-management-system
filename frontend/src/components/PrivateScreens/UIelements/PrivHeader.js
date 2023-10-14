import React from 'react';
import './PrivHeader.css';

const Header = () => {
  return (
    <header className="privv-header-main-custom">
      <div className="privv-icon-custom">
        <img
          src="https://raw.githubusercontent.com/nxdun/BlaBla/main/2.png"
          alt="logo"
          className="privv-header-img-custom privv-small-logo"
        />
      </div>
      <h1 className="privv-headerr-h1-custom">PRIVATE SCREENING MANAGEMENT DASHBOARD</h1>
      <div className="privv-button-container-main-custom">
        <button className="privv-login-button-custom">
          <img
            src="https://via.placeholder.com/120"
            alt="logo"
            className="privv-login-img-custom"
          />
          <p className="privv-admin-text-custom">Administrator</p>
        </button>
      </div>
      <div className="privv-button-container-custom">
        <button variant="outlined" className="privv-logout-button-custom">Logout</button>
      </div>
    </header>
  );
};

export default Header;
