const { Grid, InputLabel, TextField, TextareaAutosize } = require("@mui/material")

const ThirdTab = () => {
    return(
        <Grid container spacing={4} my={5}>
          <InputLabel sx={{marginBottom:"10px"}}>Remarks/Note for Internal Use</InputLabel>
          <TextField multiline fullWidth rows={3}/>
        </Grid>
    )
}

export default ThirdTab