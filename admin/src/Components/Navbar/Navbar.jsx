import React from 'react';
import './Navbar.css';
import navlogo from '../../assets/logo1.jpeg';
import navProfile from '../../assets/profile.jpeg';
import arrow from '../../assets/dropdown.jpeg'; // Import the arrow image

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='nav-left'>
        <img src={navlogo} alt="Logo" className="nav-logo" />
        <div className='nav-titles'>
          <h1 className='nav-main-title'>DECATHLON</h1>
          <h2 className='nav-sub-title'>ADMIN PANEL</h2>
        </div>
      </div>
      <div className='nav-right'>
        <img src={navProfile} alt="Profile" className="nav-profile" />
        <img src={arrow} alt="Arrow" className="nav-arrow" />
      </div>
    </div>
  );
}

export default Navbar;
