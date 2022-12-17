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
    <>
    <header className="m-4 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/mission">
          <h1 className="mb-0 h1"> Live Wire </h1>
        </Link>

        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
              <Link to="/">Setlist</Link>
              <Link to="/compose">Compose</Link>
              <Link to="/profile">Profile</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
    <div className="container">
      <div className="card">
        <h3>Welcome to Live Wire!</h3>
      </div>
    </div>
    </>
    
  );
};

export default Header;
