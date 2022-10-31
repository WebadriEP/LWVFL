import { Link } from "react-router-dom";

const Navbar = () => {
    return (
      <nav className="navbar">
        <h1>LWVFL</h1>
        <p>Add main page Links</p>
        <hr></hr>
        <Link to="/register">Register</Link>
        

      </nav>
  );
}

export default Navbar;
