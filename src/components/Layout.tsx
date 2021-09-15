import React, { useEffect, useState } from 'react';

import Nav from './Nav';
import { Redirect } from 'react-router';
import { User } from '../models/user.model';
import axios from 'axios';

export const Layout = (props: any) => {
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('user');
        setUser(data);
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
      <Nav user={user} />
      <div className='container-fluid'>
        <div className='row'>
          <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
              <h1 className='h2'>Dashboard</h1>
            </div>
            <h2>Section title</h2>
            {props.children}
          </main>
        </div>
      </div>
    </div>
  );
};
