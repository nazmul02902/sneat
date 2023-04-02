import { yupResolver } from '@hookform/resolvers/yup'
import { CopyAll, Delete, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'
const { Grid, Typography, Button, TextField, Autocomplete } = require('@mui/material')
import { Box } from '@mui/system'
import { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import AutoCompleteAddNew from 'src/@bderp-core/components/FromFields/AutoCompleteAddNew'
import { useAppDispatch, useAppSelector } from 'src/store/apps/hooks'
import { addItem, makeEditable, removeItem, updateItem } from 'src/store/apps/purchase-order'
import { useGetProductsQuery } from 'src/store/service/purchaseOrder'
import * as yup from 'yup'

const EachNotEditableItem = ({ item }: any) => {
  const dispatch = useAppDispatch()
  return (
    <Box>
      <Grid item container xs={12} alignItems={'flex-start'} spacing={1}>
        <Grid item xs={1}>
          <Typography>Image</Typography>
        </Grid>
        <Grid item xs={3} rowGap={2}>
          <Typography>product </Typography>
          <Typography sx={{ display: 'block' }}>Description</Typography>
        </Grid>
        <Grid container item xs={3} rowGap={1} spacing={1}>
          <Grid item xs={4}>
            quty
          </Grid>
          <Grid item xs={4}>
            qty
          </Grid>
          <Grid item xs={4}>
            priice
          </Grid>
          <Grid item xs={12}>
            textfield
          </Grid>
        </Grid>
        <Grid item xs={2}>
          tax
        </Grid>
        <Grid item xs={1}>
          38373
        </Grid>
        <Grid item xs={2} sx={{ display: 'flex' }}>
          <IconButton color='secondary'>
            <CopyAll />
          </IconButton>
          <IconButton color='secondary' onClick={() => dispatch(makeEditable(item.id))}>
            <Edit />
          </IconButton>
          <IconButton color='secondary'>
            <Delete sx={{ cursor: 'pointer' }} onClick={() => dispatch(removeItem(item.id))} />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  )
}

export default EachNotEditableItem
