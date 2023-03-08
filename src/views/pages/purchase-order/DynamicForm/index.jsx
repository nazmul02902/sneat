const { Grid, Typography, Button } = require('@mui/material')

const DynamicForm = () => {
  return (
    <>
    <Grid item container xs={12} sx={{marginTop: "30px", borderBottom: "1px solid"}} alignItems={"center"}>
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
      <Grid item xs={2}>
        <Typography>Unit Price</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography>Tax</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography>Subtotal</Typography>
      </Grid>
    </Grid>
    <Grid item xs={12} sx={{marginTop: "20px"}}>
        <Button variant='outlined'>+ Add New</Button>
    </Grid>
    </>
  )
}

export default DynamicForm
