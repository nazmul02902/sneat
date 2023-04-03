import { CopyAll, Delete, Edit, Wallpaper } from '@mui/icons-material'
import { IconButton } from '@mui/material'
const { Grid, Typography } = require('@mui/material')
import { Box } from '@mui/system'
import { useAppDispatch, useAppSelector } from 'src/store/apps/hooks'
import {  makeEditable, removeItem } from 'src/store/apps/purchase-order'

const EachNotEditableItem = ({ item }: any) => {
  const { items } = useAppSelector(state => state.purchaseOrder)
  const dispatch = useAppDispatch()
  return (
    <Box>
      <Grid item container xs={12} alignItems={'flex-start'} p={2} spacing={1}>
        <Grid item xs={1}>
        <Wallpaper fontSize={'large'}/>
        </Grid>
        <Grid item xs={3} rowGap={2}>
          <Typography>{item?.product} </Typography>
          <Typography sx={{ display: 'block' }}>{item?.description}</Typography>
        </Grid>
        <Grid container item xs={3} rowGap={1} spacing={1} sx={{textAlign: "center"}}>
          <Grid item xs={4}>
            {item?.ordered_qty}
          </Grid>
          <Grid item xs={4}>
          {item?.received_qty}
          </Grid>
          <Grid item xs={4} sx={{textAlign: "right"}}>
          {item?.unit_price}
          </Grid>
          <Grid item xs={12} >
          {item?.input}
          </Grid>
        </Grid>
        <Grid item xs={2} sx={{textAlign: "center"}}>
        {item?.tax}
        </Grid>
        <Grid item xs={1}>
          38373
        </Grid>
        <Grid item xs={2} sx={{ display: 'flex' }}>
          <IconButton color='secondary'>
            <CopyAll />
          </IconButton>
          <IconButton
            color='secondary'
            onClick={(e: any) => {
              if (!items.some((e: any) => e.isEditable)) {
                e.stopPropagation()
                dispatch(makeEditable(item.id))
              }
            }}
          >
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
