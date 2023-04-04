import { Close, Wallpaper } from '@mui/icons-material'
import { Button, Divider, Grid, IconButton, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useAppSelector } from 'src/store/apps/hooks'

const SummaryPart = () => {
  const [images, setImages] = useState<any>([])
  const { items } = useAppSelector(state => state.purchaseOrder)

  const handleUpload = (event: any) => {
    const file = event.target.files[0]

    const reader = new FileReader()

    reader.onload = function (event: any) {
      // setImages(event.target.result)
      setImages((imgs: any) => [...imgs, event.target.result])
    }

    reader.readAsDataURL(file)
  }
  return (
    <Grid container justifyContent={'space-between'}>
      <Grid item xs={4}>
        <Button sx={{ border: '1px dashed', height: '120px' }} component='label'>
          Attach File
          <input hidden accept='image/*' type='file' onChange={handleUpload} />
        </Button>
      </Grid>
      <Grid item container xs={6} spacing={4}>
        <Grid item xs={5}>
          <Typography sx={{ paddingBottom: 2 }}>Add discount</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label='BDT' size='small' type={'number'} />
            <TextField size='small' disabled value={'%'} />
          </Box>
        </Grid>
        <Grid item xs={7} rowSpacing={2} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography sx={{ backgroundColor: 'primary.main', padding: 3 }}>Summary</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>SubTotal</Typography>
            <Typography>
              BDT:{' '}
              {items
                ? items
                    .reduce((total: any, currentVal: any) => {
                      if (currentVal.hasOwnProperty('unit_price')) {
                        return total + currentVal.unit_price * currentVal.received_qty
                      } else {
                        return total + 0
                      }
                    }, 0)
                    .toFixed(2)
                : 0}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Tax</Typography>
            <Typography>
              BDT:0.00
              {/* {items
                ? items.reduce((total: any, currentVal: any) => {
                    if (currentVal.tax) {
                      return total + ((currentVal.tax * currentVal.unit_Price) / 100)
                    } else {
                      return total + 0
                    }
                  }, 0)
                : 0} */}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Payment</Typography>
            <Typography>BDT: 23838</Typography>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total</Typography>
            <Typography>BDT: 23838</Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', gap: 2, marginY: 3, alignItems: 'end' }}>
        {!images.length && (
          <>
            <Wallpaper fontSize='large' />
            <Wallpaper fontSize='large' />
            <Wallpaper fontSize='large' />
          </>
        )}

        {images.map((img: any, i: any) => (
          <Box>
            <img width={100} src={img} alt='img' key={i} />
          </Box>
        ))}
      </Grid>
      <TextField fullWidth multiline rows={3} />
    </Grid>
  )
}

export default SummaryPart
