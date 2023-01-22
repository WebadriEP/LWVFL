import { Link } from "react-router-dom";
import React from 'react';

// Components
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import NavLink from "./NavLink";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
// css
import './navStyles.css';

const Navbar = () => {
  const {user} =  useAuthContext()
  const {logout} = useLogout()

  const handleClick = () => {
    logout()
  }

    return (
      <nav className="navbar">
        <div className="nav-container">

          {/* Nav Front */}
          <div className="nav-front">

            {/* Logo */}
            <Link to="/" className="logo-link">
              <h1 className="nav-logo">Dontra CRM</h1>
            </Link>

            {/* Links */}
            <div className="nav-links">
              <NavLink page='/' text='Dashboard' />
              <NavLink page='/members' text='Members' />
              <NavLink page='/donors' text='Donors' />
              <NavLink page='/engagement' text='Engagement' />
              <NavLink page='/reports' text='Reports' />
              
            </div>
            </div>

            {/* Nav Rear */}
            {!user && (
            <div className="nav-rear">
            {/* PrimaryButton contains the necessary <Link/> component, but accepts these properties to make it work */}
              <SecondaryButton page='/create' text='Create Account' />
              <PrimaryButton page='/login' text='Log In' />
              </div>
        )}
        {user && (
            <div className="nav-rear">
            {/* PrimaryButton contains the necessary <Link/> component, but accepts these properties to make it work */}
              <button className="btn btn-primary" onClick={handleClick}>Log Out</button>
              </div>
        )}
        
          </div>
       

      </nav>
  );
}

export default Navbar;
