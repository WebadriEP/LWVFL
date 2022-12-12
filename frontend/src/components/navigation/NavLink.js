import { Link } from "react-router-dom";
import React from 'react';


const NavLink = (props) => {
  const { page, text } = props;

  return (
    <Link to={page} className="nav-link">
      <p>{text}</p>
    </Link>
  )
}

export default NavLink