import { Backdrop, Box, Button, CircularProgress, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useEffect, useState } from 'react';
import { useHttpClient } from '../utils/http-hook';
import OrderForm from './OrderForm';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: '10px',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  table: {
    minWidth: 650,
  },
  modal: {
    minWidth: '30%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    boxShadow: '24px',
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'space-between',
    width: '100%'
  }
}));

export default function Orrders () {
  const [orders, setOrders] = useState([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const { isLoading, sendRequest } = useHttpClient();
  const classes = useStyles();

  const onSubmit = async (data) => {
    try {
      await sendRequest('orders/create', 'POST', JSON.stringify(data));
      getOrders();
      setIsOrderModalOpen(false);
    } catch (error) { }
  };

  const getOrders = useCallback(async () => {
    try {
      const apiResponse = await sendRequest('orders', 'GET');
      setOrders([...apiResponse])
    } catch (error) { }
  }, [sendRequest])

  useEffect(() => {
    getOrders()
  }, [getOrders])

  return (
    <div className={classes.root}>
      <div className={classes.buttonWrapper}>
        <Typography variant='h4' style={{ color: 'black' }}>Order Book</Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => setIsOrderModalOpen(true)}
        >
          Add New Order
        </Button>
      </div>
      <Modal
        open={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      >
        <Box className={classes.modal}>
          <OrderForm onSubmit={onSubmit} />
        </Box>
      </Modal>

      <TableContainer component={Paper}>
        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress color='inherit' />
        </Backdrop>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='right'>Side</TableCell>
              <TableCell align='right'>Amount</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='right'>GTC</TableCell>
              <TableCell align='right'>Expiry Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              !orders.length && (
                <TableRow>
                  <TableCell align='center' colSpan="5">{isLoading ? 'Loading...' : 'No records found.'}</TableCell>
                </TableRow>
              )
            }
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell align='right'>{order.side}</TableCell>
                <TableCell align='right'>{order.amount}</TableCell>
                <TableCell align='right'>{order.price}</TableCell>
                <TableCell align='right'>{order.gtc ? 'Yes' : 'No'}</TableCell>
                <TableCell align='right'>{order.expiryDate || ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
