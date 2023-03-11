import { Autocomplete, Grid, InputLabel, TextField } from "@mui/material"

const FirstTab = () => {
    return(
        <Grid container>
        <Grid container item xs={12} sx={{ marginY: '10px' }}>
          <Grid item xs={2}>
            <InputLabel>Vendor's Name</InputLabel>
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              size='small'
              fullWidth
              disablePortal
              id='combo-box-demo'
              options={[{ label: 'one' }, { label: 'two' }]}
              renderInput={params => <TextField {...params} label='Movie' />}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} sx={{ marginY: '10px' }}>
          <Grid item xs={2}>
            <InputLabel>Vendor's Name</InputLabel>
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              size='small'
              fullWidth
              disablePortal
              id='combo-box-demo'
              options={[{ label: 'one' }, { label: 'two' }]}
              renderInput={params => <TextField {...params} label='Movie' />}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} sx={{ marginY: '10px' }}>
          <Grid item xs={2}>
            <InputLabel>Vendor's Name</InputLabel>
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              size='small'
              fullWidth
              disablePortal
              id='combo-box-demo'
              options={[{ label: 'one' }, { label: 'two' }]}
              renderInput={params => <TextField {...params} label='Movie' />}
            />
          </Grid>
        </Grid>
      </Grid>
    )
}

export default FirstTab