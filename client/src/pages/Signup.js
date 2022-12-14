import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
//   logic here...


  return (
    <main className="main-cont">
      <div className="card-cont">
        <div className="card">
          <h4 className="card-header">Sign Up</h4>
          <div className="card-body">
            <form 
            // onSubmit={handleFormSubmit}
            >
              <input
                className="form-input"
                placeholder="Your username"
                name="username"
                type="username"
                id="username"
                // value={formState.username}
                // onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                // value={formState.email}
                // onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                // value={formState.password}
                // onChange={handleChange}
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

export default Signup;