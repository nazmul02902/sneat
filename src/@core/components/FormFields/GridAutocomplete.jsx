import { Grid, InputLabel, Autocomplete, TextField, Box, Button, Typography } from '@mui/material'

const GridAutocomplete = ({ cols, addNew, label, name, options = [], variable_name }) => {
  const copied_option = [...options]
  // if (addNew) {
  //   copied_option.push({ [variable_name] : 'Add New' })
  // }
  const defaultProps = {
    options: copied_option,
    getOptionLabel: (option) => variable_name ? option[variable_name] : option.label,
  };
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
          renderInput={params => <TextField {...params}  />}
          // renderOption={(props, option) => {
          //   return option.label === 'Add New' ? (
          //     <Typography color='primary' sx={{ padding: '5px', cursor: 'pointer' }}>
          //       + {option.label}
          //     </Typography>
          //   ) : (
          //     <Box component='li' value={option[variable_name]} {...props}>
          //       {variable_name ? option[variable_name] : option.label}
          //     </Box>
          //   )
          // }}
        />
      </Grid>
    </Grid>
  )
}

export default GridAutocomplete
