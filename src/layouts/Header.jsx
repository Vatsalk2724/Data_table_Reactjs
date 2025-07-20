import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

const Header = () => {


  return (
<>

<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <NavLink className="navbar-brand " to="/">Navbar</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-5">
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="/Home">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/About">About</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/PageNotFound">Pages</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link disabled" aria-disabled="true">Disabled</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
</>
  )
}

export default Header