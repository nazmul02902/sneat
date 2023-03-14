import * as React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { Box } from '@mui/system'
import {
  Autocomplete,
  FormControlLabel,
  Grid,
  Input,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material'
import TabArea from './TabArea'

function SimpleDialog(props) {
  const { onClose, open } = props

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog onClose={handleClose} open={open} maxWidth='lg' fullWidth>
      <DialogTitle>Add New Vendor</DialogTitle>
      <Box sx={{ padding: '20px' }}>
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
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                defaultValue='business'
                name='radio-buttons-group'
                row
              >
                <FormControlLabel value='business' control={<Radio />} label='Business' />
                <FormControlLabel value='individual' control={<Radio />} label='Individual' />
              </RadioGroup>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginY: '10px' }}>
            <Grid item xs={2}>
              <InputLabel>Vendor's Name</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <Autocomplete
                size='small'
                fullWidth
                disablePortal
                id='combo-box-demo'
                options={[{ label: 'one' }, { label: 'two' }]}
                renderInput={params => <TextField {...params} label='Movie' />}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField size='small' fullWidth />
            </Grid>
            <Grid item xs={2}>
              <TextField size='small' fullWidth />
            </Grid>
          </Grid>
          <Grid container item xs={12} sx={{ marginY: '10px' }}>
            <Grid item xs={2}>
              <InputLabel>Vendor's Name</InputLabel>
            </Grid>
            <Grid item xs={6}>
              <TextField size='small' fullWidth />
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
              <TextField size='small' fullWidth />
            </Grid>
          </Grid>
          <Grid container item xs={12} sx={{ marginY: '10px' }} spacing={2}>
            <Grid item xs={2}>
              <InputLabel>Vendor's Name</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <TextField size='small' fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField size='small' fullWidth />
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
          <Typography color={'primary'} my={2}>
            Add more details
          </Typography>
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
              <TextField size='small' fullWidth />
            </Grid>
          </Grid>
          <TabArea />
        </Grid>
      </Box>
    </Dialog>
  )
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}

export default function AddressDialague() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = value => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant='text' onClick={handleClickOpen}>
        + Add New
      </Button>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  )
}