import React from "react"
import { Link } from 'react-router-dom';

function Header() {
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/home">Movie Theater Management System</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to ="/" className="nav-link active"> Home </Link>
        </li>
        <li className="nav-item">
          <Link to ="/addMovie" className="nav-link active"> Add Movie </Link>
        </li>

      </ul>
    </div>
  </div>
</nav>
)
}

export default Header; 