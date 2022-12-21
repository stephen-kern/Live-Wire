// === PACKAGE IMPORTS===
import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";

// === FILE IMPORTS ===
import Auth from "../../utils/auth";

// ANT Layout for Header
const { Header } = Layout;

// Header component variable function
const HeaderComponent = () => {
  // logout function for users to logout if logged in
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  // JSX for global App that changes if a user is logged in
  return (
    <>
        <Header className="nav">
          <div>
            <Link to="/mission">
              <h1 className="logo"> Live Wire </h1>
            </Link>
          </div>
          <div className="nav-links-container">
            {Auth.loggedIn() ? (
              <>
                <Link to="/" className="nav-links">
                  Setlist
                </Link>
                <Link to="/compose" className="nav-links">
                  Compose
                </Link>
                <Link to="/profile" className="nav-links">
                  Profile
                </Link>
                <a href="/" className="nav-links lgbtn" onClick={logout}>
                  Logout
                </a>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-links">
                  Login
                </Link>
                <Link to="/signup" className="nav-links alt-btn">
                  Signup
                </Link>
              </>
            )}
          </div>
        </Header>
    </>
  );
};

// Export HeaderComponent
export default HeaderComponent;
