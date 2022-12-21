// === PACKAGE IMPORT ===
import React, { useState } from "react";
import { useMutation } from "@apollo/client";

// === FILE IMPORT
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

// Login variable function to set state and create JSX
const Login = (props) => {
  // Set State and use mutation
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  // Handle State Change
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Handle submitting the form, check for JWT and change State
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

//   Dynamic JSX for Global App
  return (
    <main className="main-cont mt-3">
      <div className="card-container">
        <div className="card">
          <h4 className="card-header">Login:</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
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

            {error && <div>Login failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

// Export Login
export default Login;
