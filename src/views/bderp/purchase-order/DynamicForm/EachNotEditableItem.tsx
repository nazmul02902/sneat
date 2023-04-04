import { CopyAll, Delete, Edit, Wallpaper } from '@mui/icons-material'
import { Fab, IconButton } from '@mui/material'
const { Grid, Typography } = require('@mui/material')
import { Box } from '@mui/system'
import { useAppDispatch, useAppSelector } from 'src/store/apps/hooks'
import { makeEditable, removeItem } from 'src/store/apps/purchase-order'

const EachNotEditableItem = ({ item }: any) => {
  const { items } = useAppSelector(state => state.purchaseOrder)
  const dispatch = useAppDispatch()
  return (
    <Box>
      <Grid item container xs={12} alignItems={'flex-start'} p={2} spacing={1}>
        <Grid item xs={1}>
          <Wallpaper fontSize={'large'} />
        </Grid>
        <Grid item xs={3} container rowGap={2}>
          <Grid item xs={12} sx={{ textAlign: 'start' }}>
            <Typography>{item?.product} </Typography>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'start' }}>
            <Typography sx={{ display: 'block' }}>{item?.description}</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={3} rowGap={1} spacing={1} sx={{ textAlign: 'center' }}>
          <Grid item xs={4}>
            {item?.ordered_qty}
          </Grid>
          <Grid item xs={4}>
            {item?.received_qty}
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'right' }}>
            {item?.unit_price}
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'start' }}>
            {item?.input}
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'start' }}>
            <Typography>Current Stock : 15</Typography>
          </Grid>
        </Grid>
        <Grid item xs={2} sx={{ textAlign: 'center' }}>
          {item?.tax}
        </Grid>
        <Grid item xs={1}>
          {Number(item?.unit_price) * Number(item?.received_qty)}
        </Grid>
        <Grid item xs={2} sx={{ display: 'flex', gap: 2 }}>
          <Fab color='primary' size='small'>
            <CopyAll />
          </Fab>
          <Fab
            color='secondary'
            size='small'
            onClick={(e: any) => {
              if (!items.some((e: any) => e.isEditable)) {
                e.stopPropagation()
                dispatch(makeEditable(item.id))
              }
            }}
          >
            <Edit />
          </Fab>
          <Fab color='secondary' size='small'>
            <Delete sx={{ cursor: 'pointer' }} onClick={() => dispatch(removeItem(item.id))} />
          </Fab>
        </Grid>
      </Grid>
    </Box>
  )
}

export default EachNotEditableItem
