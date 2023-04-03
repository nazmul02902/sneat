import { CopyAll, Delete, Edit } from '@mui/icons-material'
import { Divider } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
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
  const [isFormOk, setIsFormOk] = useState(false)

  return (
    <>
      <Grid item container xs={12} sx={{ marginTop: '30px',borderRadius: "3px", padding: 3, backgroundColor: 'primary.main',color: 'common.white', fontSize: ".5rem" }}  alignItems={'center'}>
        <Grid item xs={1}>
          <Typography sx={{ fontSize: ".8rem !important"}}>Image</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography sx={{ fontSize: ".8rem !important"}}>Name</Typography>
        </Grid>
        <Grid item xs={3} container sx={{ textAlign: 'center'}}>
          <Grid item xs={4}>
            <Typography sx={{ fontSize: ".8rem !important"}}>Ordered Qty</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography sx={{ fontSize: ".8rem !important"}}>Received Qty</Typography>
          </Grid>
          <Grid item xs={4} sx={{textAlign: "right"}}>
            <Typography sx={{ fontSize: ".8rem !important"}}>Unit Price</Typography>
          </Grid>
        </Grid>
        <Grid item xs={2} sx={{textAlign: "center"}}>
          <Typography sx={{ fontSize: ".8rem !important"}}>Tax</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ fontSize: ".8rem !important"}}>Subtotal</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ marginY: 2 }} />

      {items.map((item: any, i: any) => (
        <>
          {item.isEditable ? (
            <EachFormItem item={item} key={item.id} />
          ) : (
            <EachNotEditableItem item={item} key={item.id} />
          )}
        </>
      ))}

      <Grid item xs={12} >
        <Button
          variant='outlined'
          onClick={(e: any) => {
            if (!items.some((e: any) => e.isEditable)) {
              e.stopPropagation()
              dispatch(addItem())
            }
          }}
        >
          + Add New
        </Button>
      </Grid>
    </>
  )
}

export default DynamicForm
