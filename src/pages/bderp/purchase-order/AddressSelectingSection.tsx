import { Edit } from '@mui/icons-material'
import { Button, Divider, IconButton, List, ListItemButton, ListItemText } from '@mui/material'
import { useRef } from 'react'
import useClickedOutside from 'src/utils/IsClickedOutside'

const AddressSelectingSection = ({ setShowAddress }: any) => {
  return (
    <List
     onClick={() => {
        setShowAddress(false)
     }}
      sx={{
        border: '1px solid',
        borderRadius: '3px',
        height: '200px',
        overflow: 'auto',
        position: 'relative',
        marginY: 2
      }}
      disablePadding
    >
      <IconButton sx={{ position: 'absolute', right: 2, zIndex: 2, top: 3 }}>
        <Edit />
      </IconButton>
      <ListItemButton>
        <ListItemText
          primary='John Doe'
          secondary={
            <>
              nazmul hasan
              <br />
              B5
              <br />
              Dhaka
              <br />
              Dhaka bivag, 1219
            </>
          }
        />
      </ListItemButton>
      <Divider />
      <ListItemButton>
        <ListItemText
          primary='John Doe'
          secondary={
            <>
              nazmul hasan
              <br />
              B5
              <br />
              Dhaka
              <br />
              Dhaka bivag, 1219
            </>
          }
        />
      </ListItemButton>
      <Divider />
      <ListItemButton>
        <ListItemText
          primary='John Doe'
          secondary={
            <>
              nazmul hasan
              <br />
              B5
              <br />
              Dhaka
              <br />
              Dhaka bivag, 1219
            </>
          }
        />
      </ListItemButton>
      <Button
        size='small'
        variant='contained'
        color='primary'
        sx={{ position: 'sticky', bottom: 0, left: 2, textAlign: 'start', cursor: 'pointer' }}
      >
        {' '}
        + Add New
      </Button>
    </List>
  )
}

export default AddressSelectingSection
