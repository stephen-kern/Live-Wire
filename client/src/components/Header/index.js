// ===IMPORTS===
import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";


const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="m-4 flex-row align-center head-cont">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <h1 className="mb-0 h1 main-head"> Live Wire </h1>
        </Link>

        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login" className="link-to">Login</Link>
              <Link to="/signup" className="link-to">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
