import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Checkbox, CircularProgress, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useHttpClient } from '../utils/http-hook';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gap: '10px'
  },
  title: {
    padding: '15px 30px 0px',
  },
  formContainer: {
    padding: '10px 30px 30px',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px'
  }
}));

const schema = yup.object({
  side: yup.string().required('Side is required'),
  amount: yup.string().required('amount is required'),
  gtc: yup.boolean(),
  price: yup.number().positive('valid Price is required').required('Price is required'),
  expiryDate: yup.date().when('gtc', (gtc, field) => gtc[0] ? field.required('Expiry date is required') : field)
});


const OrderForm = ({ onSubmit }) => {
  const classes = useStyles();
  const { isLoading, sendRequest } = useHttpClient();

  const { handleSubmit, formState: { errors }, watch, resetField, control } = useForm({
    defaultValues: { gtc: false },
    resolver: yupResolver(schema)
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classes.root}
    >
      <Typography className={classes.title} variant='h6'>
        Add Order
      </Typography>
      <Divider />
      <div className={classes.formContainer}>
        <Controller
          name='side'
          control={control}
          render={({ field }) => (
            <FormControl
              fullWidth
              error={errors?.side}
              helperText={errors?.side?.message}
            >
              <InputLabel id='side-label'>Side</InputLabel>
              <Select
                labelId='side-label'
                {...field}
              >
                <MenuItem value='Buy'>Buy</MenuItem>
                <MenuItem value='Sell'>Sell</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name='amount'
          control={control}
          render={({ field }) => (
            <FormControl
              fullWidth
              error={errors?.amount}
              helperText={errors?.amount?.message}
            >
              <InputLabel id='amount-label'>Amount</InputLabel>
              <Select
                labelId='amount-label'
                {...field}
              >
                <MenuItem value="Dollars">Dollars</MenuItem>
                <MenuItem value="Shares">Shares</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name='price'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Price'
              variant='outlined'
              type='number'
              fullWidth
              error={errors?.price}
              helperText={errors?.price?.message}
            />
          )}
        />
        {/* <Controller
          name='gtc'
          control={control}
          render={({ field }) => (
            <FormControlLabel control={<Checkbox  {...field} />} label='GTC' />
          )}
        />
        {
          watch('gtc') && <Controller
            name='expiryDate'
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label='Expiry Date'
                  inputFormat='MM/DD/YYYY'
                  {...field}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...field}
                      error={errors?.expiryDate}
                      helperText={errors?.expiryDate?.message}
                    />
                  )
                  }
                />
              </LocalizationProvider>
            )}
          />
        } */}
        <Button variant='contained' color='primary' type='submit'>
          {
            isLoading ? <CircularProgress color='white' /> : 'Submit'
          }
        </Button>
      </div>
    </form>
  );
};

export default OrderForm
