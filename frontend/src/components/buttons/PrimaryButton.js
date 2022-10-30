import { Link } from "react-router-dom";

// css
import './buttonStyles.css';

const PrimaryButton = (props) => {
  const { page, text } = props; // Destructuring props

  return (
    
    // URL to link the button to; example: "/register"
    <Link to={page} className="link">
      {/* Contains text that can be filled in */}
      <button className="btn btn-primary">{text}</button>
    </Link>
    
  )
}

export default PrimaryButton