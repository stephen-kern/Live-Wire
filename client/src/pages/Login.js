import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import Auth from '../utils/auth';

const Login = (props) => {
    // login code here

    return (
        <main className='main-cont'>
            <div className='card-container'>
                <div className='card'>
                    <h4 className='card-header'>Login:</h4>
                    <div className='card-body'>
                        <form
                        // onSubmit={handleFormSubmit}
                        >
                            <input 
                            className='form-input'
                            placeholder='Email'
                            name='email'
                            type='email'
                            id='email'
                            // value={formState.email}
                            // onChange={handleChange}
                            />
                            <input 
                            className='form-input'
                            placeholder='*****'
                            name='password'
                            type='password'
                            id='password'
                            // value={formState.password}
                            // onChange={handleChange}
                            />
                            <button className='btn' type='submit'>
                                Submit
                            </button>
                        </form>

                        {error && <div>Login failed</div>}
                    </div>
                </div>
            </div>
        </main>
    )
};

export default Login;