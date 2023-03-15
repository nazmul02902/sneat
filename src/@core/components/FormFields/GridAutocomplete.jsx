import { Grid, InputLabel, Autocomplete, TextField, Box, Button, Typography } from '@mui/material'

const GridAutocomplete = ({cols, addNew, label, name, options=[]}) => {
  
  if(addNew){
    options.push({label: "Add New"})
  }
  return (
    <Grid container item xs={12} sx={{ marginY: '10px' }}>
      <Grid item xs={cols ? cols[0] : 2}>
        <InputLabel>{label? label : "label"}</InputLabel>
      </Grid>
      <Grid item xs={cols ? cols[1] : 6}>
        <Autocomplete
          size='small'
          fullWidth
          disablePortal
          id='combo-box-demo'
          options={options}
          renderInput={params => <TextField {...params} label={label} />}
          renderOption={(props, option) => {
            return option.label === 'Add New' ? (
              <Typography color='primary' sx={{ padding: '5px', cursor: 'pointer' }}>
                + {option.label}
              </Typography>
            ) : (
              <Box component='li' {...props}>
                {option.label}
              </Box>
            )
          }}
        />
      </Grid>
    </Grid>
  )
}

export default GridAutocomplete
