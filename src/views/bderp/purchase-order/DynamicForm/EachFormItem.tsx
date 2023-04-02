import { yupResolver } from '@hookform/resolvers/yup'
import { CopyAll, Delete, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'
const { Grid, Typography, Button, TextField, Autocomplete } = require('@mui/material')
import { Box } from '@mui/system'
import { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import AutoCompleteAddNew from 'src/@bderp-core/components/FromFields/AutoCompleteAddNew'
import { useAppDispatch, useAppSelector } from 'src/store/apps/hooks'
import { addItem, removeItem, updateItem } from 'src/store/apps/purchase-order'
import { useGetPaymentTermQuery, useGetProductsQuery } from 'src/store/service/purchaseOrder'
import * as yup from 'yup'

const schema = yup.object({
  ordered_qty: yup.number().required(),
  received_qty: yup.number().required(),
})

const EachFormItem = ({item}:any) => {
  console.log(item);
  const formRef = useRef<any>(null)
  const dispatch = useAppDispatch()
  const products = useGetProductsQuery('pruducts')

  const methods = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    function handleClickOutside(event: any) {
      const form = formRef.current
      const isClickedOutside = form && !form.contains(event.target)
      if (isClickedOutside) {
        methods.handleSubmit(onSubmit)()
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const onSubmit = (values: any) => {
    dispatch(updateItem({...values, ...item}))
  }
  return (
    <FormProvider {...methods}>
      <Box component={'form'} ref={formRef}>
        <Grid item container xs={12} alignItems={'flex-start'} spacing={1}>
          <Grid item xs={1}>
            <Typography>Image</Typography>
          </Grid>
          <Grid item xs={3} container rowGap={2}>
            <Autocomplete
              options={products.isSuccess ? products?.data?.data : []}
              size='small'
              fullWidth
              renderInput={(params: any) => <TextField {...params} label='Product' />}
              getOptionLabel={(option: any) => option.item_name}
            />
            <TextField fullWidth multiline rows={3} size={'small'} />
          </Grid>
          <Grid container item xs={3} rowGap={1} spacing={1}>
            <Grid item xs={4}>
              <TextField
                defaultValue={item?.ordered_qty}
                {...methods.register('ordered_qty')}
                error={methods.formState.errors.ordered_qty && true}
                size={'small'}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                {...methods.register('received_qty')}
                defaultValue={item?.received_qty}
                error={methods.formState.errors.received_qty && true}
                size={'small'}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                {...methods.register('unit_price')}
                error={methods.formState.errors.unit_price && true}
                size={'small'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth size={'small'} />
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <AutoCompleteAddNew
              itemName='tax'
              options={['one', 'two']}
              label='Tax'
              control={methods.control}
              cols={[0, 12]}
            />
          </Grid>
          <Grid item xs={1}>
            38373
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex' }}>
            <IconButton color='secondary'>
              <CopyAll />
            </IconButton>
            <IconButton color='secondary'>
              <Edit />
            </IconButton>
            <IconButton color='secondary'>
              <Delete sx={{ cursor: 'pointer' }} onClick={() => dispatch(removeItem(item.id))} />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  )
}

export default EachFormItem
