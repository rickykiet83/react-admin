import React, { useEffect, useState } from 'react';

import { Layout } from '../components/Layout';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { User } from '../models/user.model';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell scope='col'>#</TableCell>
            <TableCell scope='col'>Name</TableCell>
            <TableCell scope='col'>Email</TableCell>
            <TableCell scope='col'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  {user.first_name} {user.last_name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Layout>
  );
}
