import { Grid, InputLabel, TextField } from '@mui/material'

const GridInput = () => {
  return (
    <Grid container item xs={12} sx={{ marginY: '10px' }}>
      <Grid item xs={2}>
        <InputLabel>Vendor's Name</InputLabel>
      </Grid>
      <Grid item xs={6}>
        <TextField size='small' fullWidth />
      </Grid>
    </Grid>
  )
}

export default GridInput
