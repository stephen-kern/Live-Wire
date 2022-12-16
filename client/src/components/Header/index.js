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
        <Link to="/">
          <h1 className="mb-0 h1"> Live Wire </h1>
        </Link>

        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
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
      <div>
        <p>
            Live Wire is a social media platform for music lovers! As a user you are able to sign up
            and create "Reviews" of your favorite tracks, records, artists, shows, and more. Add Bandmates, see others revies, and engage in discussions!
        </p>
      </div>
    </div>
    </>
    
  );
};

export default Header;
