import { Autocomplete, Grid, InputLabel, TextField } from "@mui/material"
import GridAutocomplete from "src/@core/components/FormFields/GridAutocomplete"

const FirstTab = () => {
    return(
        <Grid container>
       <GridAutocomplete label={"Currency"}/>
       <GridAutocomplete label={"Tax Rate"}/>
       <GridAutocomplete label={"Payment Term"}/>
      </Grid>
    )
}

export default FirstTab