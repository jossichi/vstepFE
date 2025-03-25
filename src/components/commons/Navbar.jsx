import { Link } from "react-router-dom";
import "../../assets/Navbar.css";
import Logout from "../../pages/logout";
const NavBar = () => {
  const isLoggedIn = localStorage.getItem("token");
  return (
    <nav className="navbar fixed-top navbar-light bg-light">
      <div className="container-fluid justify-content-between">
        <div className="navbar-left flex">
          <Link className="navbar-brand" to="/">
            MY APP
          </Link>
        </div>

        {/* Add navigation links */}
        <div className="navbar-links">
          <Link className="nav-link" to="/tests">
            Test List
          </Link>
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/test-form">
            Test Form
          </Link>
          <Link className="nav-link" to="/exam">
            ExamPage
          </Link>{" "}
          {isLoggedIn && <Logout />}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
