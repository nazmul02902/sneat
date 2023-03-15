import { Grid } from '@mui/material'

const { default: GridAutocomplete } = require('src/@core/components/FormFields/GridAutocomplete')

const SecondTab = () => {
  return (
    <Grid container spacing={4}>
      <Grid item container xs={6}>
        <GridAutocomplete cols={[4, 6]} />
        <GridAutocomplete cols={[4, 6]} />
        <GridAutocomplete cols={[4, 6]} />
        <GridAutocomplete cols={[4, 6]} />
        <GridAutocomplete cols={[4, 6]} />
        <GridAutocomplete cols={[4, 6]} />
        <GridAutocomplete cols={[4, 6]} />
      </Grid>
      <Grid item container xs={6}>
        <GridAutocomplete cols={[4, 6]} />
        <GridAutocomplete cols={[4, 6]} />
        <GridAutocomplete cols={[4, 6]} />
        <GridAutocomplete cols={[4, 6]} />
        <GridAutocomplete cols={[4, 6]} />
        <GridAutocomplete cols={[4, 6]} />
      </Grid>
    </Grid>
  )
}

export default SecondTab
