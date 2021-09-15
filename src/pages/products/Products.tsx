import { IProduct, ProductState } from '../../models/product.model';
import React, { useEffect, useState } from 'react';

import { Button } from '@material-ui/core';
import { Layout } from '../../components/Layout';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import ToggleButton from '@material-ui/lab/ToggleButton';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState<IProduct[]>([]);

  const [page, setPage] = useState(0);
  const [perPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const deleteProduct = async (id: number | null) => {
    if (window.confirm('Are you sure?')) {
      await axios.delete(`products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('products');
      setProducts(data);
    })();
  }, []);

  return (
    <Layout>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
        <h1 className='h2'>Products</h1>
      </div>
      <h2>Product List</h2>
      <Button href='/products/create' variant='contained' color='primary'>
        Add New
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products
            .slice(page * perPage, (page + 1) * perPage)
            .map((product) => {
              return (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <img
                      // style={{ maxWidth: '150px' }}
                      width={100}
                      src={product.image}
                      alt={product.title}
                    />
                  </TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <ToggleButton>
                      <Button
                        href={`/products/${product.id}`}
                        variant='contained'
                        color='primary'
                        className='me-2'
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteProduct(product.id)}
                        variant='contained'
                        color='secondary'
                      >
                        Delete
                      </Button>
                    </ToggleButton>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        <TableFooter>
          <TablePagination
            count={products.length}
            page={page}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPage={perPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </TableFooter>
      </Table>
    </Layout>
  );
}
