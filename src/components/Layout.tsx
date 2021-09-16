import { IUser, User } from '../models/user.model';
import React, { Dispatch, useEffect, useState } from 'react';

import Nav from './Nav';
import { Redirect } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from '../redux/actions/setUserAction';

const Layout = (props: any) => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('user');
        const user: IUser = response.data;
        props.setUser(
          new User(user.id, user.first_name, user.last_name, user.email)
        );
      } catch (error) {
        setRedirect(true);
      }
    })();
  }, []);

  if (redirect) {
    return <Redirect to='/login' />;
  }

  return (
    <div>
      <Nav />
      <div className='container-fluid'>
        <div className='row'>
          <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
            {props.children}
          </main>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: { user: User }) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUser: (user: User) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
