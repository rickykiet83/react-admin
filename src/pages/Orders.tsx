import React, { useEffect, useState } from 'react';
import { TableBody, TableCell, TableRow } from '@material-ui/core';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IOrder } from '../models/order.model';
import { Layout } from '../components/Layout';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import axios from 'axios';

export default function Orders() {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('orders');
      setOrders(data);
    })();
  }, []);

  const subTotal = (price: number, quantity: number) => {
    return price * quantity;
  };

  return (
    <Layout>
      {orders.map((order) => {
        return (
          <Accordion key={order.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              {order.name} - ${order.total}
            </AccordionSummary>
            <AccordionDetails>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Product Title</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Sub Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.order_items.map((item) => {
                    return (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.product_title}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          ${subTotal(item.price, item.quantity)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Layout>
  );
}
