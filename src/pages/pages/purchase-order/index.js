
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { ModeEdit } from '@mui/icons-material'
import {
  Autocomplete,
  Button,
  Divider,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField
} from '@mui/material'
import { Box } from '@mui/system'
import DynamicForm from 'src/views/pages/purchase-order/DynamicForm'
import AddressDialague from 'src/views/pages/purchase-order/VendorCreateDialogue'
import { useState } from 'react'

const PurchaseOrder = () => {
  const [showAddressSection, setShowAddressSection] = useState(false);
  
  return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='New Purchase Order' />
            <CardContent>
              <Grid container>
                <Grid container item xs={12} sx={{ marginY: '10px' }}>
                  <Grid item xs={2}>
                    <InputLabel>Vendor's Name</InputLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      size='small'
                      fullWidth
                      disablePortal
                      id='combo-box-demo'
                      options={[{ label: 'one' }, { label: 'two' }]}
                      renderInput={params => <TextField {...params} label='Movie' />}
                    />
                    <AddressDialague />
                  </Grid>
                </Grid>
                <Grid container item xs={12} sx={{ marginBottom: '60px' }}>
                  <Grid item xs={2}>
                    <InputLabel>Delivery To</InputLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <RadioGroup
                      aria-labelledby='demo-radio-buttons-group-label'
                      defaultValue='warehouse'
                      name='radio-buttons-group'
                      row
                    >
                      <FormControlLabel value='warehouse' control={<Radio />} label='Warehouse/Shop' />
                      <FormControlLabel value='customer' control={<Radio />} label='Customer' />
                    </RadioGroup>
                    <Autocomplete
                      size='small'
                      fullWidth
                      disablePortal
                      id='combo-box-demo'
                      options={[{ label: 'one' }, { label: 'two' }]}
                      renderInput={params => <TextField {...params} label='Movie' />}
                    />
                    <AddressDialague />
                    <Box>
                      <Box sx={{ position: 'relative' }}>
                        <Typography
                          variant='h6'
                          onClick={() => setShowAddressSection(!showAddressSection)}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            gap: 1,
                            marginBottom: '10px'
                          }}
                        >
                          Tree <ModeEdit />
                        </Typography>
                        {showAddressSection && (
                          <Stack
                            divider={<Divider />}
                            spacing={1}
                            sx={{
                              padding: '10px',
                              borderRadius: '5px',
                              position: 'absolute',
                              bgcolor: 'background.default',
                              width: '350px',
                              maxHeight: '350px'
                            }}
                          >
                            <Typography>pargaragodid</Typography>
                            <Typography>pargaragodid</Typography>
                            <Typography>pargaragodid</Typography>
                            <AddressDialague />
                          </Stack>
                        )}
                      </Box>
                      <Typography size='small' variant='body1'>
                        House
                      </Typography>
                      <Typography variant='body1'>Dhaka, Dhaka</Typography>
                      <Typography variant='body1'>bangladesh, 28383</Typography>
                      <Typography variant='body1'>3838487747484</Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container item xs={12} sx={{ marginY: '10px' }}>
                  <Grid item xs={2}>
                    <InputLabel>Input label</InputLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth xs={9} size='small' />
                  </Grid>
                </Grid>
                <Grid container item xs={12} sx={{ marginY: '10px' }}>
                  <Grid item xs={2}>
                    <InputLabel>Input label</InputLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth xs={9} size='small' />
                  </Grid>
                </Grid>
                <Grid container item xs={12} sx={{ marginY: '10px' }}>
                  <Grid item xs={2}>
                    <InputLabel>Input label</InputLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth xs={9} size='small' />
                  </Grid>
                </Grid>
                <Grid container item xs={12} sx={{ marginY: '10px' }}>
                  <Grid item xs={2}>
                    <InputLabel>Input label</InputLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth xs={9} size='small' />
                  </Grid>
                </Grid>
                <Grid container item xs={12} sx={{ marginY: '10px' }}>
                  <Grid item xs={2}>
                    <InputLabel>Payment</InputLabel>
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      size='small'
                      fullWidth
                      disablePortal
                      id='combo-box-demo'
                      options={[{ label: 'one' }, { label: 'two' }]}
                      renderInput={params => <TextField {...params} label='Movie' />}
                    />
                  </Grid>
                </Grid>
                <DynamicForm />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
  )
}

export default PurchaseOrder
