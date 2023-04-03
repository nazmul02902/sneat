import { yupResolver } from '@hookform/resolvers/yup'
import { CheckCircle, CopyAll, Delete, Edit, Wallpaper } from '@mui/icons-material'
import { Fab, IconButton } from '@mui/material'
const { Grid, Typography, Button, TextField, Autocomplete } = require('@mui/material')
import { Box } from '@mui/system'
import { useEffect, useRef } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import AutoCompleteAddNew from 'src/@bderp-core/components/FromFields/AutoCompleteAddNew'
import { useAppDispatch, useAppSelector } from 'src/store/apps/hooks'
import { addItem, removeItem, updateItem } from 'src/store/apps/purchase-order'
import { useGetPaymentTermQuery, useGetProductsQuery } from 'src/store/service/purchaseOrder'
import * as yup from 'yup'

const schema = yup.object({
  ordered_qty: yup.number().required(),
  received_qty: yup.number().required(),
  unit_price: yup.number().required(),
  product: yup.string().required(),
  tax: yup.string().required()
})

const EachFormItem = ({ item }: any) => {
  console.log(item)
  const formRef = useRef<any>(null)
  const dispatch = useAppDispatch()
  const products = useGetProductsQuery('pruducts')

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: item
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
    dispatch(updateItem({ ...item, ...values }))
  }
  return (
    <FormProvider {...methods}>
      <Box component={'form'} onSubmit={methods.handleSubmit(onSubmit)} ref={formRef}>
        <Grid item container p={2} xs={12} alignItems={'flex-start'} spacing={1}>
          <Grid item xs={1}>
            <Wallpaper fontSize={'large'}/>
          </Grid>
          <Grid item xs={3} container rowGap={2}>
            <Controller
              control={methods.control}
              name={'product'}
              defaultValue={item.product}
              render={({ field }: any) => (
                <Autocomplete
                  {...field}
                  options={products.isSuccess ? products?.data?.data : [{ item_name: 'item 1' }]}
                  ListboxProps={{ onClick: (e: any) => e.stopPropagation() }}
                  size='small'
                  freeSolo
                  fullWidth
                  error={methods.formState.errors.product && true}
                  inputValue={field.value}
                  onInputChange={(event: any, newVal: any) => field.onChange(newVal)}
                  onChange={(_: any, option: any) => {
                    if (!option) return
                    option?.item_name ? field.onChange(option.item_name) : field.onChange(option)
                  }}
                  getOptionLabel={(option: any) => option.item_name ?? option}
                  renderInput={(params: any) => <TextField error={methods.formState.errors.product && true} value={field.value} {...params} label='Product' />}
                />
              )}
            />
            <TextField {...methods.register('description')} fullWidth multiline rows={3} size={'small'} />
          </Grid>
          <Grid container item xs={3} rowGap={1} spacing={1}>
            <Grid item xs={4}>
              <TextField
                {...methods.register('ordered_qty')}
                error={methods.formState.errors.ordered_qty && true}
                size={'small'}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                {...methods.register('received_qty')}
                error={methods.formState.errors.received_qty && true}
                size={'small'}
              />
            </Grid>
            <Grid item xs={4} sx={{textAlign: "right"}}>
              <TextField
                {...methods.register('unit_price')}
                error={methods.formState.errors.unit_price && true}
                size={'small'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField {...methods.register('input')} fullWidth size={'small'} />
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <AutoCompleteAddNew
              hideInputLabel
              label='Tax'
              error={methods.formState.errors.tax && true}
              itemName='tax'
              options={['one', 'two']}
              control={methods.control}
              cols={[0, 12]}
              initialVal={item?.tax}
            />
          </Grid>
          <Grid item xs={1} sx={{paddingTop: "10px !important"}}>
            38373
          </Grid>
          <Grid item  xs={2} sx={{display:"flex", gap: 2}}>
            <Fab color='primary' size='small'>
              <CopyAll />
            </Fab>
            <Fab color='success' type='submit' size='small'>
              <CheckCircle />
            </Fab>
            <Fab  size='small'>
              <Delete
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  dispatch(removeItem(item.id))
                }}
              />
            </Fab>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  )
}

export default EachFormItem
