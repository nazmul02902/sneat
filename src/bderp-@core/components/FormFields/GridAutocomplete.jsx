import { Grid, InputLabel, Autocomplete, TextField, Box, Button, Typography, Badge, Chip, Modal } from '@mui/material'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

const GridAutocomplete = ({ cols, addNew, label, formName, options = [], variable_name }) => {
  const copied_option = [...options]

  const defaultProps = {
    options: copied_option,
    getOptionLabel: option => (variable_name ? option[variable_name] : option.label)
  }

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
          renderInput={params => <TextField {...params} />}
        />
      </Grid>
    </Grid>
  )
}

export default GridAutocomplete
