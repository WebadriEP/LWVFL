import { Link } from "react-router-dom";

// Components
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import NavLink from "./NavLink";

// css
import './navStyles.css';

const Navbar = () => {
    return (
      <nav className="navbar">
        <div className="nav-container">

          {/* Nav Front */}
          <div className="nav-front">

            {/* Logo */}
            <Link to="/" className="logo-link">
              <h1 className="nav-logo">LWVFL</h1>
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
            <div className="nav-rear">

            {/* PrimaryButton contains the necessary <Link/> component, but accepts these properties to make it work */}
            <SecondaryButton page='/register' text='Register' />
            <PrimaryButton page='/login' text='Log In' />
          </div>
        </div>

      </nav>
  );
}

export default Navbar;
