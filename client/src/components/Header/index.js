// ===IMPORTS===
import React from "react";
import { Layout } from "antd";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

const { Header } = Layout;

const HeaderComponent = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

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
                <a href="/" className="nav-links logout-btn" onClick={logout}>
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

export default HeaderComponent;
