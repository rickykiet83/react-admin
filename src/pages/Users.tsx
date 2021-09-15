import React, { useEffect, useState } from 'react';

import { Layout } from '../components/Layout';
import { User } from '../models/user.model';
import axios from 'axios';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('ambassadors');
      setUsers(data);
    })();
  }, []);
  return (
    <Layout>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
        <h1 className='h2'>Users</h1>
      </div>
      <h2>User List</h2>
      <table className='table table-striped table-sm'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {user.first_name} {user.last_name}
                </td>
                <td>{user.email}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
}
