// === PACKAGE IMPORTS ===
import React, { useState } from "react";
import { useMutation } from "@apollo/client";

// === FILE IMPORTS ===
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

// Signup single Page functionality and JSX
const Signup = () => {
  // Create State variables and set their static state
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  // Create Add User variable through mutation and add error checking variable
  const [addUser, { error }] = useMutation(ADD_USER);

  // Variable Function to set User target and change state
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Add Data to User through State
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      // Assign JWToken to newly signed up user
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  // Dynamically generated JSX Return for Single Page application
  return (
    <main className="main-cont mt-3">
      <div className="card-cont">
        <div className="card">
          <h4 className="card-header">Sign Up</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Password"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="btn" type="submit">
                Submit
              </button>
            </form>

            {error && <div>Signup failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

// Export Signup for Global Application
export default Signup;
