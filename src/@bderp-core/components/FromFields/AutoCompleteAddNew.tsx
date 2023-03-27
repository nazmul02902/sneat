import { ArrowDownward, Close } from '@mui/icons-material'
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
  IconButton,
  InputAdornment
} from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useCreateLocationMutation } from 'src/store/service/vendor'

const AutoCompleteAddNew = ({
  cols,
  parent,
  addNew,
  initialVal,
  label,
  itemName,
  options = [],
  variable_name,
  control,
  refetch,
  isFetching
}: any) => {
  const [value, setValue] = useState(null)
  const [open, setOpen] = useState(false)
  let copied_option = options ? [...options] : []

  if (addNew) {
    copied_option = options
      ? [...options, { [variable_name]: `+ Add New ${label}`, isCustom: true }]
      : [{ [variable_name]: `+ Add New ${label}`, isCustom: true }]
  }
  const [createLocation, result] = useCreateLocationMutation()

  const defaultProps = {
    options: copied_option,
    getOptionLabel: (option: any) => (variable_name ? option[variable_name] : option)
  }

  const methods = useFormContext()
  const watch_val = methods.watch()

  const filter = createFilterOptions<any>()

  const [dialogValue, setDialogValue] = useState({
    name: '',
    source: itemName
  })

  const handleSubmit = (event: any) => {
    event.preventDefault()
    createLocation({ ...dialogValue, parent_id: watch_val[parent]?.id })
  }

  useEffect(() => {
    if (!initialVal) return
    if (result.isUninitialized || (result.status === 'fulfilled' && !isFetching)) {
      if (!copied_option?.some(each => each[variable_name] === initialVal[variable_name])) {
        setValue(null)
        methods.resetField(itemName)
      }
    }
  }, [watch_val[parent]])

  useEffect(() => {
    if (initialVal) {
      methods.setValue(itemName, initialVal)
      setValue(initialVal)
    } else {
      methods.resetField(itemName)
      setValue(null)
    }
  }, [initialVal])

  //   modal states
  useEffect(() => {
    if (result.isSuccess) {
      if (refetch) {
        if (parent === 'country') {
          refetch(watch_val[parent]?.iso2)
        } else {
          refetch(watch_val[parent]?.id)
        }
        setOpen(false)
      }
      setValue({
        ...result?.data?.data
      })
      methods.setValue(itemName, result?.data?.data)
    }
  }, [result.isSuccess])

  return (
    <Grid key={itemName} container item xs={12}>
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
              disabled={parent && !watch_val[parent]?.id ? true : false}
              clearOnBlur
              handleHomeEndKeys
              renderOption={(props, option) => {
                return (
                  <Box {...props} component='li' sx={{ color: option.isCustom && 'blue' }}>
                    {variable_name ? option[variable_name] : option}
                  </Box>
                )
              }}
              value={value !== '' ? value : null}
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
                  ? copied_option?.some(each => each[variable_name].includes(newValue[variable_name]) && !each.isCustom)
                  : false

                if (typeof newValue === 'string') {
                  // timeout to avoid instant validation of the dialog's form.

                  setTimeout(() => {
                    setOpen(true)
                    setDialogValue({
                      ...dialogValue,
                      name: newValue
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
                const { inputValue }: any = params
                // Suggest the creation of a new value
                const isExisting = options.some(option => inputValue === option[variable_name])

                if (inputValue !== '' && !isExisting) {
                  if (variable_name) {
                    filtered.pop()
                    filtered.push({
                      inputValue: inputValue,
                      [variable_name]: `+ Add New ${label}(${inputValue})`,
                      isCustom: true
                    })
                  } else {
                    filtered.push(inputValue)
                    return filtered
                  }
                }

                return filtered
              }}
            />
          )}
        />
      </Grid>
      <Dialog
        open={open}
        onClose={(event, reason) => {
          if (reason === 'backdropClick') return
          setOpen(false)
        }}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle
            sx={{
              borderBottom: '1px solid',
              padding: '5px 10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box>Add New {label}</Box>
            <IconButton sx={{ color: 'red' }} onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              size='small'
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
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            {/* <LoadingButton loading={result.isLoading} loadingPosition={'start'} type='submit'>
              Save
            </LoadingButton> */}
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  )
}

export default AutoCompleteAddNew
