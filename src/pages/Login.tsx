import './../Login.css';

import React, { SyntheticEvent, useState } from 'react';

import { Redirect } from 'react-router';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(email);

    const result = await axios.post('login', {
      email,
      password,
    });
    if (result.status === 200) setRedirect(true);
  };

  if (redirect) {
    return <Redirect to='/' />;
  }

  return (
    <main className='form-signin'>
      <form>
        <h1 className='h3 mb-3 fw-normal'>Please sign in</h1>
        <div className='form-floating'>
          <input
            type='email'
            className='form-control'
            id='floatingInput'
            onChange={(e) => setEmail(e.target.value)}
            placeholder='name@example.com'
          />
          <label htmlFor='floatingInput'>Email address</label>
        </div>
        <div className='form-floating'>
          <input
            type='password'
            className='form-control'
            id='floatingPassword'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
          <label htmlFor='floatingPassword'>Password</label>
        </div>
        <div className='checkbox mb-3'>
          <label>
            <input type='checkbox' defaultValue='remember-me' /> Remember me
          </label>
        </div>
        <button
          onClick={submit}
          className='w-100 btn btn-lg btn-primary'
          type='submit'
        >
          Sign in
        </button>
        <p className='mt-5 mb-3 text-muted'>© 2017–2021</p>
      </form>
    </main>
  );
}
