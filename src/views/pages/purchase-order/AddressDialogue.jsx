import * as React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import PersonIcon from '@mui/icons-material/Person'
import AddIcon from '@mui/icons-material/Add'
import Typography from '@mui/material/Typography'
import { blue } from '@mui/material/colors'
import { Box } from '@mui/system'
import { Autocomplete, TextField } from '@mui/material'

function SimpleDialog(props) {
  const { onClose, open } = props

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={'300px'}>
      <DialogTitle>Set backup account</DialogTitle>
      <Box sx={{ padding: '20px' }}>
        <Autocomplete
          sx={{marginBottom: "10px"}}
          size='small'
          fullWidth
          disablePortal
          id='combo-box-demo'
          options={[{ label: 'one' }, { label: 'two' }]}
          renderInput={params => <TextField {...params} label='Movie' />}
        />
        <Autocomplete
        sx={{marginBottom: "10px"}}
          size='small'
          fullWidth
          disablePortal
          id='combo-box-demo'
          options={[{ label: 'one' }, { label: 'two' }]}
          renderInput={params => <TextField {...params} label='Movie' />}
        />
        <Autocomplete
        sx={{marginBottom: "10px"}}
          size='small'
          fullWidth
          disablePortal
          id='combo-box-demo'
          options={[{ label: 'one' }, { label: 'two' }]}
          renderInput={params => <TextField {...params} label='Movie' />}
        />
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
