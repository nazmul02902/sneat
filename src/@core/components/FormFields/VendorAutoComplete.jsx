import { Grid, InputLabel, Autocomplete, TextField, Box, Button, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'

const VendorAutoComplete = ({ cols, addNew, label, itemName, options = [], variable_name }) => {
  const copied_option = [...options]

  const defaultProps = {
    options: copied_option,
    getOptionLabel: option => (variable_name ? option[variable_name] : option)
  }

  const { register } = useFormContext()

  return (
    <Grid container item xs={12} sx={{ marginY: '10px' }}>
      <Grid item xs={cols ? cols[0] : 2}>
        <InputLabel>{label ? label : 'label'}</InputLabel>
      </Grid>
      <Grid item xs={cols ? cols[1] : 6}>
        <Autocomplete
          {...defaultProps}
          size='small'
          fullWidth
          disablePortal
          id='combo-box-demo'
          renderInput={params => <TextField label={label} {...register(itemName)} {...params} />}
        />
      </Grid>
    </Grid>
  )
}

export default VendorAutoComplete
