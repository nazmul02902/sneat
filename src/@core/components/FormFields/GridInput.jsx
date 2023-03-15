import { Grid, InputLabel, TextField } from '@mui/material'

const GridInput = ({label, cols}) => {
  return (
    <Grid container item xs={12} sx={{ marginY: '10px' }}>
      <Grid item xs={cols ? cols[0] : 2}>
        <InputLabel>{label ?? "label"}</InputLabel>
      </Grid>
      <Grid item xs={cols ? cols[1] : 6}>
        <TextField size='small' fullWidth />
      </Grid>
    </Grid>
  )
}

export default GridInput
