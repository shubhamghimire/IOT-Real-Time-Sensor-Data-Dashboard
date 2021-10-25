import React  from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';


function Navbar() {

  return (
    <>
      <nav className='navbar-container'>
        <Link to='/' className='logo'>
          <img src={logo} alt="Logo" />
        </Link>
        <ul  className='nav-item-container'>
          <li>
            <Link to='/'>Dashboard</Link>
          </li>
          <li>
            <Link to='/Maintenance'>Maintenance</Link>
          </li>
          <li>
            <Link to='/About'>About</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;