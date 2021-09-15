import React, { Component, SyntheticEvent } from 'react';

import { Redirect } from 'react-router';
import axios from 'axios';

export default class Register extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    redirect: false,
  };

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = this.mapToViewModel(this.state);

    await axios.post('http://localhost:8000/api/admin/register', data);
    this.setState({
      redirect: true,
    });
  };

  mapToViewModel(data: any) {
    return {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      password_confirm: data.password,
    };
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={'/login'} />;
    }
    return (
      <main className='form-signin'>
        <form onSubmit={this.submit}>
          <h1 className='h3 mb-3 fw-normal'>Sign up</h1>
          <div className='form-floating'>
            <input
              type='text'
              className='form-control'
              id='firstName'
              name='firstName'
              placeholder='First Name'
              onChange={(e) =>
                this.setState({
                  firstName: e.target.value,
                })
              }
            />
            <label htmlFor='firstName'>First Name</label>
          </div>
          <div className='form-floating'>
            <input
              type='text'
              className='form-control'
              id='lastName'
              name='lastName'
              placeholder='Last Name'
              onChange={(e) =>
                this.setState({
                  lastName: e.target.value,
                })
              }
            />
            <label htmlFor='lastName'>Last Name</label>
          </div>
          <div className='form-floating'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              placeholder='name@example.com'
              onChange={(e) =>
                this.setState({
                  email: e.target.value,
                })
              }
            />
            <label htmlFor='email'>Email address</label>
          </div>
          <div className='form-floating'>
            <input
              type='password'
              className='form-control'
              id='password'
              placeholder='Password'
              onChange={(e) =>
                this.setState({
                  password: e.target.value,
                })
              }
            />
            <label htmlFor='password'>Password</label>
          </div>
          <div className='checkbox mb-3'>
            <label>
              <input type='checkbox' defaultValue='remember-me' /> Remember me
            </label>
          </div>
          <button className='w-100 btn btn-lg btn-primary' type='submit'>
            Sign Up
          </button>
          <p className='mt-5 mb-3 text-muted'>© 2017–2021</p>
        </form>
      </main>
    );
  }
}
