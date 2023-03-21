import { LoadingButton } from '@mui/lab'
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
  DialogActions,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useCreateLocationMutation } from 'src/store/services/vendor'

const VendorAutoComplete = ({
  cols,
  parent,
  addNew,
  initialVal,
  label,
  itemName,
  options = [],
  variable_name,
  control
}) => {
  const [value, setValue] = useState(null)
  const [open, setOpen] = useState(false)
  const copied_option = options ? [...options] : []
  const [createLocation, result] = useCreateLocationMutation()

  console.log(initialVal);

  const defaultProps = {
    options: copied_option,
    getOptionLabel: option => (variable_name ? option[variable_name] : option)
  }

  const methods = useFormContext()
  const watch_val = methods.watch()
  console.log(watch_val)

  const filter = createFilterOptions()

  const [dialogValue, setDialogValue] = useState({
    name: '',
    source: itemName
  })

  const handleSubmit = event => {
    event.preventDefault()

    createLocation({ ...dialogValue, parent_id: watch_val[parent]?.id })
  }
  useEffect(() => {
    if (result.isSuccess) {
      setValue({
        ...result?.data?.data
      })
      methods.setValue(itemName, result?.data?.data)
      setOpen(false)
    }
  }, [result.isSuccess])

  useEffect(() => {
    if (!initialVal) {
      return
    }
    if (!copied_option?.some(each => each[variable_name] === initialVal[variable_name])) {
      setValue(null)
      methods.resetField(itemName)
    }
  }, [options])

  useEffect(() => {
    if (initialVal) {
      methods.setValue(itemName, initialVal)
      setValue(initialVal)
    } else {
      methods.resetField(itemName)
      setValue(null)
    }
  }, [initialVal])

  return (
    <Grid key={itemName} container item xs={12} sx={{ marginY: '10px' }}>
      <Grid item xs={cols ? cols[0] : 2}>
        <InputLabel>{label ? label : 'label'}</InputLabel>
      </Grid>
      <Grid item xs={cols ? cols[1] : 6}>
        <Controller
          control={control}
          name={itemName}
          render={({ field }) => (
            <Autocomplete
              {...field}
              selectOnFocus
              disabled={parent && !watch_val[parent] ? true : false}
              clearOnBlur
              handleHomeEndKeys
              freeSolo
              value={value}
              {...defaultProps}
              size='small'
              fullWidth
              disablePortal
              id='combo-box-demo'
              renderInput={params => <TextField label={label} {...params} />}
              onChange={(event, newValue) => {
                if (!addNew) {
                  setValue(newValue)
                  field.onChange(newValue)
                  return
                }
                const isExist = newValue
                  ? copied_option?.some(each => each[variable_name].includes(newValue[variable_name]))
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
                    field.onChange(newValue)
                  } else {
                    setOpen(true)
                    setDialogValue({
                      ...dialogValue,
                      name: newValue.inputValue
                    })
                  }
                } else {
                  setValue(newValue)
                  field.onChange(newValue)
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
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add New</DialogTitle>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <LoadingButton loading={result.isLoading} loadingPosition={'start'} type='submit'>
              Save
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  )
}

export default VendorAutoComplete
