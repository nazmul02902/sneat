import {
  Grid,
  InputLabel,
  Autocomplete,
  TextField,
  Button,
  createFilterOptions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

const VendorAutoComplete = ({ cols, addNew, label, itemName, options = [], variable_name }) => {
  const [value, setValue] = useState(null)
  const [open, setOpen] = useState(false)
  const copied_option = [...options]

  const defaultProps = {
    options: copied_option,
    getOptionLabel: option => (variable_name ? option[variable_name] : option)
  }

  const { register } = useFormContext()
  const filter = createFilterOptions()

  const [dialogValue, setDialogValue] = useState({
    [variable_name]: ''
  })

  const handleSubmit = event => {
    event.preventDefault()
    setValue({
      [variable_name]: dialogValue[variable_name]
    })
    setOpen(false)
  }

  return (
    <Grid container item xs={12} sx={{ marginY: '10px' }}>
      <Grid item xs={cols ? cols[0] : 2}>
        <InputLabel>{label ? label : 'label'}</InputLabel>
      </Grid>
      <Grid item xs={cols ? cols[1] : 6}>
        <Autocomplete
          value={value}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          freeSolo
          {...defaultProps}
          size='small'
          fullWidth
          disablePortal
          id='combo-box-demo'
          renderInput={params => <TextField label={label} {...register(itemName)} {...params} />}
          onChange={(event, newValue) => {
            if (!addNew) {
              setValue(newValue)
              return
            }
            const isExist = newValue
              ? options.some(each => each[variable_name].includes(newValue[variable_name]))
              : false

            if (typeof newValue === 'string') {
              // timeout to avoid instant validation of the dialog's form.

              setTimeout(() => {
                setOpen(true)
                setDialogValue({
                  [variable_name]: newValue
                })
              })
            } else if (newValue && newValue[variable_name]) {
              if (isExist) {
                setValue(newValue)
              } else {
                setOpen(true)
                setDialogValue({
                  [variable_name]: newValue.inputValue
                })
              }
            } else {
              setValue(newValue)
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params)
            if (!addNew) {
              return filtered
            }

            const { inputValue } = params
            // Suggest the creation of a new value
            const isExisting = options.some(option => inputValue === option[variable_name])

            if (inputValue !== '' && !isExisting) {
              if (variable_name) {
                filtered.push({
                  inputValue: inputValue,
                  [variable_name]: `+ Add "${inputValue}"`
                })
              } else {
                filtered.push(inputValue)
              }
            }

            return filtered
          }}
        />
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new film</DialogTitle>
          <DialogContent>
            <DialogContentText>Did you miss any film in our list? Please, add it!</DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              value={dialogValue[variable_name]}
              onChange={event =>
                setDialogValue({
                  ...dialogValue,
                  [variable_name]: event.target.value
                })
              }
              label='title'
              type='text'
              variant='standard'
            />
            <TextField
              margin='dense'
              id='name'
              value={dialogValue.year}
              onChange={event =>
                setDialogValue({
                  ...dialogValue,
                  year: event.target.value
                })
              }
              label='year'
              type='number'
              variant='standard'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type='submit'>Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  )
}

export default VendorAutoComplete
