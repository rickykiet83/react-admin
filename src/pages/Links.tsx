import React, { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import { Link } from '../models/link.model';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';

export default function Links(props: any) {
  const { id } = props.match.params;

  const [links, setLinks] = useState<Link[]>([]);
  const [page, setPage] = useState(0);
  const perPage = 10;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/users/${id}/links`);
      console.log(data);

      setLinks(data);
    })();
  }, []);

  const revenue = (s: number, o: number) => s + o;

  return (
    <Layout>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Count</TableCell>
            <TableCell>Revenue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {links.slice(page * perPage, (page + 1) * perPage).map((link) => {
            return (
              <TableRow key={link.id}>
                <TableCell>{link.id}</TableCell>
                <TableCell>{link.code}</TableCell>
                <TableCell>{link.orders.length}</TableCell>
                <TableCell>
                  {link.orders.reduce((s, o) => revenue(s, o.total), 0)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Layout>
  );
}
