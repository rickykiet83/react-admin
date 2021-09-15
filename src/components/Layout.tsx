import React, { useEffect, useState } from 'react';

import { IUser } from '../models/user.model';
import Nav from './Nav';
import { Redirect } from 'react-router';
import axios from 'axios';

export const Layout = (props: any) => {
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

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
            {props.children}
          </main>
        </div>
      </div>
    </div>
  );
};
