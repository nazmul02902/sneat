import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Edit, ModeEdit, PlusOne } from '@mui/icons-material'
import {
  Autocomplete,
  Button,
  Chip,
  Divider,
  FormControlLabel,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
  RadioGroup,
  Stack,
  TextField
} from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import VendorCreate from 'src/views/bderp/purchase-order/VendorCreate'
import DynamicForm from 'src/views/bderp/purchase-order/DynamicForm'
import {
  useGetCustomersQuery,
  useGetPaymentTermQuery,
  useGetVendorsQuery,
  useGetWareHousesQuery
} from 'src/store/service/purchaseOrder'
import { useForm, Controller } from 'react-hook-form'

const PurchaseOrder = () => {
  const [showAddressSection, setShowAddressSection] = useState(false)
  const [deliveryAddress, setDeliveryAddress] = useState<any>(null)
  console.log(deliveryAddress)

  const methods = useForm()

  const vendors = useGetVendorsQuery('porder')
  const wareHouse = useGetWareHousesQuery<any>('wareHouse')
  const customers = useGetCustomersQuery<any>('customer')
  const paymentTerm = useGetPaymentTermQuery<any>('paymentTerm')

  const delivery_to = methods.watch('delivery_to')

  const onSubmit = (values: any) => {
    console.log(values)
  }

  console.log(wareHouse)

  useEffect(() => {
    if (delivery_to === 'warehouse' && wareHouse.status === 'fulfilled') {
      setDeliveryAddress(wareHouse?.data?.data[0])
    } else {
      setDeliveryAddress(null)
    }
  }, [delivery_to, wareHouse.status])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='New Purchase Order' sx={{ borderBottom: '1px solid', margin: 0, paddingY: 3 }} />
          <CardContent>
            <Box component={'form'} onBlur={methods.handleSubmit(onSubmit)}>
              <Grid container rowGap={2} py={3}>
                <Grid container item xs={12}>
                  <Grid item xs={2}>
                    <InputLabel>Vendor's Name</InputLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      size='small'
                      fullWidth
                      disablePortal
                      id='combo-box-demo'
                      options={vendors?.data?.data ?? []}
                      renderInput={params => <TextField {...params} label='Vendors Name' />}
                      getOptionLabel={(option: any) => option?.display_name}
                    />
                    <VendorCreate />
                    <List
                      sx={{
                        border: '1px solid',
                        borderRadius: '3px',
                        height: '200px',
                        overflow: 'auto',
                        position: 'relative',
                        marginY: 2
                      }}
                      disablePadding
                    >
                      <IconButton sx={{ position: 'absolute', right: 2, zIndex: 2, top: 3 }}>
                        <Edit />
                      </IconButton>
                      <ListItemButton>
                        <ListItemText
                          primary='John Doe'
                          secondary={
                            <>
                              nazmul hasan
                              <br />
                              B5
                              <br />
                              Dhaka
                              <br />
                              Dhaka bivag, 1219
                            </>
                          }
                        />
                      </ListItemButton>
                      <Divider />
                      <ListItemButton>
                        <ListItemText
                          primary='John Doe'
                          secondary={
                            <>
                              nazmul hasan
                              <br />
                              B5
                              <br />
                              Dhaka
                              <br />
                              Dhaka bivag, 1219
                            </>
                          }
                        />
                      </ListItemButton>
                      <Divider />
                      <ListItemButton>
                        <ListItemText
                          primary='John Doe'
                          secondary={
                            <>
                              nazmul hasan
                              <br />
                              B5
                              <br />
                              Dhaka
                              <br />
                              Dhaka bivag, 1219
                            </>
                          }
                        />
                      </ListItemButton>
                      <Button
                        size='small'
                        variant='contained'
                        color='primary'
                        sx={{ position: 'sticky', bottom: 0, left: 2, textAlign: 'start', cursor: 'pointer' }}
                      >
                        {' '}
                        + Add New
                      </Button>
                    </List>
                    <List sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <ListItemText
                        primary={
                          <>
                            Billing Address
                            <IconButton>
                              {' '}
                              <Edit />
                            </IconButton>
                          </>
                        }
                        secondary={
                          <>
                            nazmul hasan
                            <br />
                            B5
                            <br />
                            Dhaka
                            <br />
                            Dhaka bivag, 1219
                          </>
                        }
                      />
                      <ListItemText
                        primary={
                          <>
                            Shipping Address
                            <IconButton>
                              {' '}
                              <Edit />
                            </IconButton>
                          </>
                        }
                        secondary={
                          <>
                            nazmul hasan
                            <br />
                            B5
                            <br />
                            Dhaka
                            <br />
                            Dhaka bivag, 1219
                          </>
                        }
                      />
                    </List>
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={2}>
                    <InputLabel>Delivery To</InputLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      control={methods.control}
                      name='delivery_to'
                      defaultValue={'warehouse'}
                      render={({ field }) => (
                        <RadioGroup {...field} row>
                          <FormControlLabel value='warehouse' control={<Radio />} label='Warehouse/Shop' />
                          <FormControlLabel value='customer' control={<Radio />} label='Customer' />
                        </RadioGroup>
                      )}
                    />

                    <Autocomplete
                      size='small'
                      fullWidth
                      disablePortal
                      id='combo-box-demo'
                      // defaultValue={wareHouse.isSuccess &&  wareHouse?.data?.data[0]}
                      value={deliveryAddress}
                      onChange={(_: any, option: any) => {
                        setDeliveryAddress(option)
                      }}
                      options={delivery_to === 'warehouse' ? wareHouse?.data?.data : customers?.data?.data}
                      renderInput={(params: any) => (
                        <TextField {...params} label={delivery_to === 'warehouse' ? 'Warehouse' : 'Customer'} />
                      )}
                      getOptionLabel={(option: any) =>
                        delivery_to === 'warehouse' ? option?.address : option?.display_name
                      }
                    />
                    {delivery_to === 'warehouse' && deliveryAddress && (
                      <List>
                        <ListItemText
                          primary={
                            <>
                              {deliveryAddress?.address}
                              <IconButton>
                                {' '}
                                <Edit />
                              </IconButton>
                            </>
                          }
                          secondary={
                            <>
                              nazmul hasan
                              <br />
                              B5
                              <br />
                              Dhaka
                              <br />
                              Dhaka bivag, 1219
                            </>
                          }
                        />
                      </List>
                    )}
                    {delivery_to === 'customer' && deliveryAddress && (
                    <List>
                    <ListItemText
                      primary={
                        <>
                          {deliveryAddress?.display_name}
                          <IconButton>
                            {' '}
                            <Edit />
                          </IconButton>
                        </>
                      }
                      secondary={
                        <>
                          nazmul hasan
                          <br />
                          B5
                          <br />
                          Dhaka
                          <br />
                          Dhaka bivag, 1219
                        </>
                      }
                    />
                  </List>
                    )}
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={2}>
                    <InputLabel>Purchase Order</InputLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth size='small' />
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={2}>
                    <InputLabel>Reference</InputLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth size='small' />
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={2}>
                    <InputLabel>Expected Delivery </InputLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth size='small' />
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={2}>
                    <InputLabel>Payment Terms</InputLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth size='small' />
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={2}>
                    <InputLabel>Payment Terms</InputLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      size='small'
                      fullWidth
                      disablePortal
                      id='combo-box-demo'
                      options={paymentTerm?.data?.data}
                      renderInput={params => <TextField {...params} label='Payment Term' />}
                      getOptionLabel={(option: any) => option.name}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <DynamicForm />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PurchaseOrder
