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
  DialogActions,
  Input
} from '@mui/material'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useCreateLocationMutation } from 'src/store/services/vendor'

const VendorAutoComplete = ({ cols, parent, addNew, label, itemName, options = [], variable_name, control }) => {
  const [value, setValue] = useState(null)
  console.log(value)
  const [open, setOpen] = useState(false)
  const copied_option = [...options]
  const [createLocation, result] = useCreateLocationMutation()
  console.log(result)

  const defaultProps = {
    options: copied_option,
    getOptionLabel: option => (variable_name ? option[variable_name] : option)
  }

  const { register, watch } = useFormContext()
  const watch_val = watch()
  console.log(watch_val)
  const filter = createFilterOptions()

  const [dialogValue, setDialogValue] = useState({
    name: '',
    source: itemName
  })

  const handleSubmit = event => {
    event.preventDefault()
    const value = {
      ...dialogValue,
      parent_id: watch_val[parent]?.id
    }
    console.log(value)
    createLocation({ ...dialogValue, parent_id: watch_val[parent]?.id })
    setValue({
      [variable_name]: dialogValue.name
    })

    setOpen(false)
  }

  return (
    <Grid key={itemName} container item xs={12} sx={{ marginY: '10px' }}>
      <Grid item xs={cols ? cols[0] : 2}>
        <InputLabel>{label ? label : 'label'}</InputLabel>
      </Grid>
      <Grid item xs={cols ? cols[1] : 6}>
        <Controller
          control={control}
          name={itemName}
          value={value}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              freeSolo
              {...defaultProps}
              size='small'
              fullWidth
              disablePortal
              id='combo-box-demo'
              renderInput={params => <TextField label={label} {...params} />}
              onChange={(event, newValue) => {
                onChange(newValue)
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
                      ...dialogValue,
                      name: newValue.inputValue
                    })
                  })
                } else if (newValue && newValue[variable_name]) {
                  if (isExist) {
                    setValue(newValue)
                  } else {
                    console.log(newValue)
                    setOpen(true)
                    setDialogValue({
                      ...dialogValue,
                      name: newValue.inputValue
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
          )}
        />
        {/* <Input
          {...register(itemName + '_id')}
          value={value && copied_option.find(each => each[variable_name] === value[variable_name])?.id}
        /> */}
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
              value={dialogValue.name}
              onChange={event =>
                setDialogValue({
                  ...dialogValue,
                  name: event.target.value
                })
              }
              label='title'
              type='text'
              variant='standard'
            />
            {/* <TextField
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
            /> */}
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
