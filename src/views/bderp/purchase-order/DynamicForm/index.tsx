import { CopyAll, Delete, Edit } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from 'src/store/apps/hooks'
import { addItem, removeItem } from 'src/store/apps/purchase-order'

const { Grid, Typography, Button, TextField, Autocomplete } = require('@mui/material')

const DynamicForm = () => {
  const dispatch = useAppDispatch()
  const { item } = useAppSelector(state => state.purchaseOrder)
  console.log(item)
  return (
    <>
      <Grid item container xs={12} sx={{ marginTop: '30px', borderBottom: '1px solid' }} alignItems={'center'}>
        <Grid item xs={1}>
          <Typography>Image</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>Name</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>Ordered Qty</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>Received Qty</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>Unit Price</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Tax</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Subtotal</Typography>
        </Grid>
      </Grid>

      {item.map((item:any, i:any) => (
        <Grid key={i} item container xs={12} sx={{ marginTop: '10px' }} alignItems={'flex-start'}>
          <Grid item xs={1}>
            <Typography>Image</Typography>
          </Grid>
          <Grid sx={{ padding: '5px' }} item xs={3}>
            <TextField sx={{ marginBottom: '10px' }} fullWidth size={'small'} />
            <TextField fullWidth multiline rows={3} size={'small'} />
          </Grid>
          <Grid container item xs={3}>
            <Grid sx={{ padding: '5px' }} item xs={4}>
              <TextField size={'small'} />
            </Grid>
            <Grid sx={{ padding: '5px' }} item xs={4}>
              <TextField size={'small'} />
            </Grid>
            <Grid sx={{ padding: '5px' }} item xs={4}>
              <TextField size={'small'} />
            </Grid>
            <Grid sx={{ padding: '5px' }} item xs={12}>
              <TextField fullWidth size={'small'} />
            </Grid>
          </Grid>
          <Grid sx={{ padding: '5px' }} item xs={2}>
            <Autocomplete
              size='small'
              fullWidth
              disablePortal
              id='combo-box-demo'
              options={[{ label: 'one' }, { label: 'two' }]}
              renderInput={(params:any) => <TextField {...params} label='Movie' />}
            />
          </Grid>
          <Grid sx={{ padding: '5px' }} item xs={2}>
            38373
          </Grid>
          <Grid sx={{ padding: '5px' }} item xs={1}>
            <CopyAll />
            <Edit />
            <Delete sx={{cursor: "pointer"}} onClick={() => dispatch(removeItem())} />
          </Grid>
        </Grid>
      ))}

      <Grid item xs={12} sx={{ marginTop: '20px' }}>
        <Button variant='outlined' onClick={() => dispatch(addItem())}>
          + Add New
        </Button>
      </Grid>
    </>
  )
}

export default DynamicForm