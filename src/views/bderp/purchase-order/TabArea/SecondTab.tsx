import { Download } from '@mui/icons-material'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import AddressComponent from 'src/@bderp-core/components/Address'
import { useAppDispatch, useAppSelector } from 'src/store/apps/hooks'
 import { copyBillingToShipping } from 'src/store/apps/vendor'

const SecondTab = () => {
  const {vendor} = useAppSelector(state => state)
  const dispatch = useAppDispatch()
  return (
    <Grid container spacing={4}>
      <Grid item container xs={6}>
        <Typography variant='h6' color={'secondary'} sx={{ marginBottom: '20px' }}>
          Billing Address
        </Typography>

        <AddressComponent domain='billing' initialVal={vendor.billing} />
      </Grid>
      <Grid item container xs={6}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '30px' }}>
          <Typography variant='h6' color={'secondary'} sx={{ marginBottom: '20px' }}>
            Shipping Address
          </Typography>
          <Button
            onClick={() => {
              dispatch(copyBillingToShipping())
            }}
            variant='text'
            startIcon={<Download />}
          >
            Copy Billing Address
          </Button>
        </Box>
        <AddressComponent domain='shipping' initialVal={vendor.shipping} />
      </Grid>
    </Grid>
  )
}

export default SecondTab