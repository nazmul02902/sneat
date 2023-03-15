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
import GridAutocomplete from 'src/@core/components/FormFields/GridAutocomplete'
import GridInput from 'src/@core/components/FormFields/GridInput'

function SimpleDialog(props) {
  const { onClose, open } = props
  const [showMore, setShowMore] = React.useState(false)

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
              <InputLabel>Vendor Type</InputLabel>
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
              <InputLabel>Primary Contact</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <Autocomplete
                size='small'
                fullWidth
                disablePortal
                id='combo-box-demo'
                options={[{ label: 'one' }, { label: 'two' }]}
                renderInput={params => <TextField {...params} label='Saluation' />}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField size='small' fullWidth />
            </Grid>
            <Grid item xs={2}>
              <TextField size='small' fullWidth />
            </Grid>
          </Grid>

          <GridInput label='Company Name' />

          <GridAutocomplete label='Vendor Display Name' />
          <GridInput label='Vendor Email' />
          <Grid container item xs={12} sx={{ marginY: '10px' }} spacing={2}>
            <Grid item xs={2}>
              <InputLabel>Vendor Phone</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <TextField size='small' fullWidth />
            </Grid>
            <Grid item xs={3}>
              <TextField size='small' fullWidth />
            </Grid>
          </Grid>
          {!showMore && (
            <Typography
              color={'primary'}
              sx={{ cursor: 'pointer' }}
              my={2}
              onClick={() => {
                setShowMore(!showMore)
              }}
            >
              Add more details
            </Typography>
          )}
          {showMore && (
            <>
              <GridAutocomplete label='Designation' />
              <GridAutocomplete label='Department' />
              <GridInput label='Website' />
            </>
          )}
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
