// ===IMPORTS===
import React from "react";
import { Layout } from "antd";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

const { Header } = Layout;

const HeaderComponent = (props) => {

  const { currentTab, handleTabChange } = props;

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <>
      <Layout>
        <Header className="nav">
          <div>
            <Link to="/mission">
              <h1 className="logo"> Live Wire </h1>
            </Link>
          </div>
          <div className="nav-links-container">
            {Auth.loggedIn() ? (
              <>
                <Link to="/" className={currentTab === "Setlist" ? "nav-link-active" : "nav-links"} onClick={() => handleTabChange("Setlist")}>
                  Setlist
                </Link>
                <Link to="/compose" className={currentTab === "Compose" ? "nav-link-active" : "nav-links"} onClick={() => handleTabChange("Compose")}>
                  Compose
                </Link>
                <Link to="/profile" className={currentTab === "Profile" ? "nav-link-active" : "nav-links"} onClick={() => handleTabChange("Profile")}>
                  Profile
                </Link>
                <a href="/" className="nav-links" onClick={logout}>
                  Logout
                </a>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-links">
                  Login
                </Link>
                <Link to="/signup" className="nav-links">
                  Signup
                </Link>
              </>
            )}
          </div>
        </Header>
      </Layout>
    </>
  );
};

export default HeaderComponent;
