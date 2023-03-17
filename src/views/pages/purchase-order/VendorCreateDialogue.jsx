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
import { useGetCountryQuery } from 'src/store/services/vendor'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import VendorAutoComplete from 'src/@core/components/FormFields/VendorAutoComplete'
import VendorInput from 'src/@core/components/FormFields/VendorInput'

function SimpleDialog(props) {
  const [displayName, setDisplayName] = React.useState([])
  const { onClose, open } = props
  const [showMore, setShowMore] = React.useState(false)

  const handleClose = () => {
    onClose()
  }
  //form
  const methods = useForm()

  const onSubmit = values => {
    console.log(values)
  }

  const watchFields = methods.watch(['salutation', 'first_name', 'last_name'])
  console.log(watchFields)

  React.useEffect(() => {
    setDisplayName([
      `${watchFields[0]} ${watchFields[1]} ${watchFields[2]}`,
      `${watchFields[1]} ${watchFields[2]}`,
      `${watchFields[0]} ${watchFields[1]}`,
      `${watchFields[0]} ${watchFields[2]}`
    ])
  }, [watchFields])

  const displayNameOptions = [watchFields[0] + watchFields[1] + watchFields[2]]

  return (
    <Dialog onClose={handleClose} open={open} maxWidth='lg' fullWidth>
      <DialogTitle>Add New Vendor</DialogTitle>
      <Box sx={{ padding: '20px' }}>
        <Grid container>
          <FormProvider {...methods}>
            <form style={{ width: '100%' }} onBlur={methods.handleSubmit(onSubmit)}>
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
                    {...methods.register('vendor_type')}
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
                  <Controller
                    control={methods.control}
                    name={'salutation'}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        options={['Mr', 'Mrs', 'Miss', 'Dr']}
                        size='small'
                        renderInput={params => {
                          return <TextField {...params} onChange={onChange} />
                        }}
                        onChange={(event, values, reason) => onChange(values)}
                        value={value}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField {...methods.register('first_name')} size='small' label={'First Name'} fullWidth />
                </Grid>
                <Grid item xs={2}>
                  <TextField size='small' {...methods.register('last_name')} label={'last Name'} fullWidth />
                </Grid>
              </Grid>

              <VendorInput itemName='company_name' label='Company Name' />

              <VendorAutoComplete label='Vendor Display Name' options={displayName} itemName={'diplay_name'} />
              <VendorInput itemName='email' label='Vendor Email' />
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
            </form>
          </FormProvider>
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
