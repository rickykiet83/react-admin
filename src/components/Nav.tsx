import { Link } from 'react-router-dom';
import React from 'react';
import { User } from './../models/user.model';
import axios from 'axios';
import { connect } from 'react-redux';

const Nav = (props: { user: User | null }) => {
  const { user } = props;

  const logout = async () => {
    axios.post('logout');
  };

  return (
    <header className='p-3 bg-dark text-white'>
      <div className='container'>
        <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start'>
          <ul className='nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'>
            <li>
              <a href='#' className='nav-link px-2 text-secondary'>
                Home
              </a>
            </li>
            <li>
              <a href='/users' className='nav-link px-2 text-white'>
                Users
              </a>
            </li>
            <li>
              <a href='/products' className='nav-link px-2 text-white'>
                Products
              </a>
            </li>
            <li>
              <a href='/orders' className='nav-link px-2 text-white'>
                Orders
              </a>
            </li>
            <li>
              <a href='#' className='nav-link px-2 text-white'>
                About
              </a>
            </li>
          </ul>
          <form className='col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3'>
            <input
              type='search'
              className='form-control form-control-dark'
              placeholder='Search...'
              aria-label='Search'
            />
          </form>
          <div className='text-end'>
            <a
              href='/login'
              type='button'
              className='btn btn-outline-light me-2'
            >
              {user?.email}
            </a>
            <a
              href='/profile'
              type='button'
              className='btn btn-outline-light me-2'
            >
              Profile
            </a>
            <Link
              onClick={logout}
              type='button'
              className='btn btn-outline-light me-2'
              to={'login'}
            >
              Logout
            </Link>
            {!user && (
              <>
                (
                <a
                  href='/login'
                  type='button'
                  className='btn btn-outline-light me-2'
                >
                  Login
                </a>
                <a
                  href='/register'
                  type='button'
                  className='btn btn-warning me-2'
                >
                  Sign-up
                </a>
                )
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default connect((state: { user: User }) => ({
  user: state.user,
}))(Nav);
