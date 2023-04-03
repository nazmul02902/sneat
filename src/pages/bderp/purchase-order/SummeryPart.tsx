import { Wallpaper } from '@mui/icons-material'
import { Button, Divider, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'

const SummaryPart = () => {
  return (
    <Grid container justifyContent={'space-between'}>
      <Grid item xs={4}>
        <Button sx={{ border: '1px dashed', height: '120px' }} component='label'>
          Attachment
          <input hidden accept='image/*' type='file' />
        </Button>
      </Grid>
      <Grid item container xs={6} spacing={4}>
        <Grid item xs={5}>
          <Typography sx={{ paddingBottom: 2 }}>Add discount</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label='BDT' size='small' type={'number'} />
            <TextField size='small' disabled value={'%'} />
          </Box>
        </Grid>
        <Grid item xs={7} rowSpacing={2} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography sx={{ backgroundColor: 'primary.main', padding: 3 }}>Summary</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>SubTotal</Typography>
            <Typography>BDT: 23838</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Tax</Typography>
            <Typography>BDT: 23838</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Payment</Typography>
            <Typography>BDT: 23838</Typography>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total</Typography>
            <Typography>BDT: 23838</Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', gap: 2, marginY:3 }}>
        <Wallpaper fontSize='large' />
        <Wallpaper fontSize='large' />
        <Wallpaper fontSize='large' />
      </Grid>
      <TextField fullWidth multiline rows={3} />
    </Grid>
  )
}

export default SummaryPart
