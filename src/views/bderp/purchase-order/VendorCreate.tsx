import * as React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { Box } from '@mui/system'
import {
  Autocomplete,
  Chip,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputLabel,
  Radio,
  RadioGroup,
  Slide,
  TextField,
  Typography
} from '@mui/material'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { Close } from '@mui/icons-material'
import { useGetDeptQuery, useGetDesignationQuery } from 'src/store/service/vendor'
import InputWithLabel from 'src/@bderp-core/components/FromFields/InputWithLabel'
import AutoCompleteAddNew from 'src/@bderp-core/components/FromFields/AutoCompleteAddNew'
import TabArea from './TabArea'

function SimpleDialog(props:any) {
  const [displayName, setDisplayName] = React.useState<any>([])
  const { onClose, open } = props
  const [showMore, setShowMore] = React.useState(false)

  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="down" ref={ref} {...props} />;
  // });

  //redux
  const designation = useGetDesignationQuery("designation")
  const dept = useGetDeptQuery("dept")

  const handleClose = (event:any, reason:any) => {
    if (reason === 'backdropClick') return
    onClose()
  }
  //form
  const methods = useForm()

  const onSubmit = (values:any) => {
    // console.log(values)
  }

  const wf = methods.watch(['salutation', 'first_name', 'last_name', 'company_name'])

  React.useEffect(() => {
    if (wf[0] && wf[1] && wf[2]) {
      setDisplayName([`${wf[0]} ${wf[1]} ${wf[2]}`, `${wf[1]} ${wf[2]}`, `${wf[2]} ${wf[1]}`, `${wf[0]} ${wf[2]}`])
      if (wf[3]) {
        setDisplayName((state:any) => [...state, `${wf[3]}`])
      }
    } else if (wf[1] && wf[1]) {
      setDisplayName([`${wf[0]} ${wf[1]} `, `${wf[1]} ${wf[0]}`])
    } else if (wf[0]) {
      setDisplayName([`${wf[0]}`])
    }
  }, [wf[0], wf[1], wf[2], wf[3]])

  return (
    <Dialog onClose={handleClose} open={open} scroll='body' maxWidth='lg' fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid',
          justifyContent: 'space-between',
          px: 5,
          py: '10px'
        }}
      >
        <Typography>Add New Vendor</Typography>
        <IconButton sx={{ color: 'red' }} onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <Box sx={{ p: 5 }}>
        <FormProvider {...methods}>
          <form style={{ width: '100%' }} onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container rowSpacing={2}>
              <Grid container item xs={12}>
                <Grid item xs={2}>
                  <InputLabel>Vendor Type</InputLabel>
                </Grid>
                <Grid item xs={6}>
                  <RadioGroup
                    aria-labelledby='demo-radio-buttons-group-label'
                    defaultValue='business'
                    row
                    {...methods.register('vendor_type')}
                  >
                    <FormControlLabel value='business' control={<Radio />} label='Business' />
                    <FormControlLabel value='individual' control={<Radio />} label='Individual' />
                  </RadioGroup>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
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
                          return <TextField label='Salutation' {...params} onChange={onChange} />
                        }}
                        onChange={(event, values, reason) => onChange(values)}
                        value={value}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField {...methods.register('first_name')} size='small' label={'First Name'} fullWidth />
                </Grid>
                <Grid item xs={3}>
                  <TextField size='small' {...methods.register('last_name')} label={'last Name'} fullWidth />
                </Grid>
              </Grid>

              <InputWithLabel itemName='company_name' label='Company Name' initialVal={''} />

              <AutoCompleteAddNew label='Vendor Display Name' options={displayName} itemName={'diplay_name'} />
              <InputWithLabel itemName='email' label='Vendor Email' />
              <Grid container item xs={12} spacing={2}>
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
                  <AutoCompleteAddNew label='Designation' options={designation?.data?.data} variable_name="name" itemName={'designation'} />
                  <AutoCompleteAddNew label='Department' options={dept?.data?.data} variable_name="name" itemName={'department'} />
                  <InputWithLabel itemName='website' label={'Website'} />
                </>
              )}
            </Grid>
          </form>
        </FormProvider>
        <TabArea/>
      </Box>
    </Dialog>
  )
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}

export default function VendorCreate() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value:any) => {
    setOpen(false)
  }

  return (
    <>
      <Chip size='small' variant='outlined' sx={{mt:1}} color='primary' label={"+ Add New"} onClick={handleClickOpen}/>
      <SimpleDialog open={open} onClose={handleClose} />
    </>
  )
}