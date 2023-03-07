// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { FormControl, FormLabel, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'

const PurchaseOrder = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='New Purchase Order' />
          <CardContent>
            <Grid container alignItems={'center'}>
              <Grid item xs={2}>
                <FormControl required>
                  <FormLabel>Vendors's name</FormLabel>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel size='small' id='vendors_name'>Vendors name</InputLabel>
                  <Select input={<OutlinedInput label="Vendors name" />} size="small" labelId='vendors_name' fullWidth>
                    <MenuItem>one</MenuItem>
                    <MenuItem>two</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PurchaseOrder
