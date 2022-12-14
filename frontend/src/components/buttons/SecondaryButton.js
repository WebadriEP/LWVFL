import { Link } from "react-router-dom";
import React from 'react';


// css
import './buttonStyles.css';

const SecondaryButton = (props) => {
  const { page, text } = props; // Destructuring props

  return (
    
    // URL to link the button to; example: "/register"
    <Link to={page} className="link">
      {/* Contains text that can be filled in */}
      <button className="btn btn-secondary">{text}</button>
    </Link>
    
  )
}

export default SecondaryButton