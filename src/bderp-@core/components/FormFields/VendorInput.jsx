import { Grid, InputLabel, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

const VendorInput = ({ label, cols, itemName, initialVal }) => {
  const { register, setValue } = useFormContext()
  useEffect(() => {
      setValue(itemName, initialVal)
  }, [initialVal])
  return (
    <Grid container item xs={12}>
      <Grid item xs={cols ? cols[0] : 2}>
        <InputLabel>{label ?? 'label'}</InputLabel>
      </Grid>
      <Grid item xs={cols ? cols[1] : 6}>
        <TextField {...register(itemName)} size='small' fullWidth />
      </Grid>
    </Grid>
  )
}

export default VendorInput
