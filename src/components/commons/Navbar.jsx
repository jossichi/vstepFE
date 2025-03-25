import { Link } from "react-router-dom";
import LogoutButton from "../LogoutButton"; // Đảm bảo bạn đã import đúng LogoutButton
import "../../assets/Navbar.css";

const NavBar = () => {
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
          </Link>

          {/* Add the Logout button here */}
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
