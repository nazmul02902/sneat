import { CopyAll, Delete, Edit } from '@mui/icons-material'
import { Divider } from '@mui/material'
import { Box } from '@mui/system'
import { FormProvider, useForm } from 'react-hook-form'
import AutoCompleteAddNew from 'src/@bderp-core/components/FromFields/AutoCompleteAddNew'
import { useAppDispatch, useAppSelector } from 'src/store/apps/hooks'
import { addItem, removeItem } from 'src/store/apps/purchase-order'
import { useGetProductsQuery } from 'src/store/service/purchaseOrder'
import EachFormItem from './EachFormItem'
import EachItem from './EachFormItem'
import EachNotEditableItem from './EachNotEditableItem'

const { Grid, Typography, Button, TextField, Autocomplete } = require('@mui/material')

const DynamicForm = () => {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector(state => state.purchaseOrder)

  return (
    <>
      <Grid
        item
        container
        xs={12}
        sx={{ marginTop: '30px' }}
        alignItems={'center'}
      >
        <Grid item xs={1}>
          <Typography>Image</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>Name</Typography>
        </Grid>
        <Grid item xs={3} container sx={{ textAlign: 'center' }}>
          <Grid item xs={4}>
            <Typography>Ordered Qty</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Received Qty</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Unit Price</Typography>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Typography>Tax</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Subtotal</Typography>
        </Grid>
      </Grid>

      <Divider sx={{marginY: 3}}/>

      {items.map((item: any, i: any) => (
        <>{item.isEditable ? <EachFormItem item={item} key={i} /> : <EachNotEditableItem item={item} key={i}/>}</>
      ))}

      <Grid item xs={12} sx={{ marginTop: '20px' }}>
        <Button variant='outlined' onClick={(e:any) => {
          // e.stopPropagation();
          dispatch(addItem())
        }}>
          + Add New
        </Button>
      </Grid>
    </>
  )
}

export default DynamicForm
