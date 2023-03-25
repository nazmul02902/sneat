import { Grid, InputLabel, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'

const VendorInput = ({label, cols, itemName}) => {
    const {register} = useFormContext();
  return (
    <Grid container item xs={12} sx={{ marginY: '10px' }}>
      <Grid item xs={cols ? cols[0] : 2}>
        <InputLabel>{label ?? "label"}</InputLabel>
      </Grid>
      <Grid item xs={cols ? cols[1] : 6}>
        <TextField {...register(itemName)} size='small' label={label} fullWidth />
      </Grid>
    </Grid>
  )
}

export default VendorInput