import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
    // login code here
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

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
          email: '',
          password: '',
        });
      };

    return (
        <main className='main-cont'>
            <div className='card-container'>
                <div className='card'>
                    <h4 className='card-header'>Login:</h4>
                    <div className='card-body'>
                        <form
                        onSubmit={handleFormSubmit}
                        >
                            <input 
                            className='form-input'
                            placeholder='Email'
                            name='email'
                            type='email'
                            id='email'
                            value={formState.email}
                            onChange={handleChange}
                            />
                            <input 
                            className='form-input'
                            placeholder='*****'
                            name='password'
                            type='password'
                            id='password'
                            value={formState.password}
                            onChange={handleChange}
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