import { Link } from "react-router-dom";

const NavLink = (props) => {
  const { page, text } = props;

  return (
    <Link to={page} className="nav-link">
      <p>{text}</p>
    </Link>
  )
}

export default NavLink