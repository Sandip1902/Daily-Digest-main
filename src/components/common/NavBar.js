import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../css/common/Navbar.css";
import { useMediaQuery } from "react-responsive";
import ToggleMode from "./ToggleMode";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
  const buttonRef = useRef(null);
  const location = useLocation();
  const { loggedIn, darkMode, setLoggedIn, setDarkMode } = props;
  const navigate = useNavigate();

  const disabled = ["/email"];

  const isTogglerVisible = useMediaQuery({
    query: "(max-width: 991.5px)",
  });

  const handleLinkClick = () => {
    if (buttonRef.current && isTogglerVisible) {
      buttonRef.current.click();
    }
  };

  console.log(location.pathname);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setLoggedIn(false);
    toast.success("You have logged out successfully");
    handleLinkClick();
    navigate("/");
  };

  return (
    <div>
      <nav
        className={`navbar fixed-top navbar-expand-lg ${
          darkMode === true ? "navbar-dark bg-dark" : "navbar-light bg-light"
        } ${disabled.includes(location.pathname) && "d-none"}`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Daily Digest
          </Link>
          <div className="d-flex justify-content-center align-items-center">
            {isTogglerVisible && (
              <ToggleMode darkMode={darkMode} setDarkMode={setDarkMode} />
            )}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              ref={buttonRef}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  onClick={handleLinkClick}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/business" ? "active" : ""
                  }`}
                  onClick={handleLinkClick}
                  to="/business"
                >
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/entertainment" ? "active" : ""
                  }`}
                  onClick={handleLinkClick}
                  to="/entertainment"
                >
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/health" ? "active" : ""
                  }`}
                  onClick={handleLinkClick}
                  to="/health"
                >
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/science" ? "active" : ""
                  }`}
                  onClick={handleLinkClick}
                  to="/science"
                >
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/sports" ? "active" : ""
                  }`}
                  onClick={handleLinkClick}
                  to="/sports"
                >
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/technology" ? "active" : ""
                  }`}
                  onClick={handleLinkClick}
                  to="/technology"
                >
                  Technology
                </Link>
              </li>
              {loggedIn && (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/bookmark" ? "active" : ""
                    }`}
                    onClick={handleLinkClick}
                    to="/bookmark"
                  >
                    Bookmark
                  </Link>
                </li>
              )}
            </ul>

            {!isTogglerVisible && (
              <ToggleMode darkMode={darkMode} setDarkMode={setDarkMode} />
            )}
            <div className="d-flex navbarBtnContainer">
              {!loggedIn ? (
                <>
                  <Link
                    className="btn btn-primary mx-1 mt-1 mb-1"
                    onClick={handleLinkClick}
                    to="/signup"
                    role="button"
                  >
                    Sign Up
                  </Link>
                  <Link
                    className="btn btn-primary mx-1 mt-1 mb-1"
                    onClick={handleLinkClick}
                    to="/login"
                    role="button"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <Link
                  className="btn btn-primary mx-1 mt-1 mb-1"
                  onClick={handleLogout}
                  to="/signup"
                  role="button"
                >
                  Log out
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
