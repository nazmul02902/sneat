import { Download } from '@mui/icons-material'
import { Button, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FormProvider, useForm } from 'react-hook-form'
import GridInput from 'src/@core/components/FormFields/GridInput'
import VendorAutoComplete from 'src/@core/components/FormFields/VendorAutoComplete'
import {
  useGetCountryQuery,
  useGetDistrictsQuery,
  useGetStatesQuery,
  useGetStreetsQuery,
  useGetThanasQuery,
  useGetUnionsQuery,
  useGetZipcodeQuery
} from 'src/store/services/vendor'

const { default: GridAutocomplete } = require('src/@core/components/FormFields/GridAutocomplete')

const SecondTab = () => {
  const methods = useForm()
  const fieldsVal = methods.watch()
  //redux
  const { data } = useGetCountryQuery('vendor')
  const states = useGetStatesQuery(fieldsVal?.country?.iso2)
  const districts = useGetDistrictsQuery(fieldsVal?.state?.id)
  const thanas = useGetThanasQuery(fieldsVal?.district?.id)
  const unions = useGetUnionsQuery(fieldsVal?.thana?.id)
  const zips = useGetZipcodeQuery(fieldsVal?.union?.id)
  const villages = useGetStreetsQuery(fieldsVal?.zip?.id)
  console.log(states)

  return (
    <Grid container spacing={4}>
      <Grid item container xs={6}>
        <FormProvider {...methods}>
          <form action='' fullWidth>
            <Typography variant='h6' color={'secondary'} sx={{ marginBottom: '20px' }}>
              Billing Address
            </Typography>
            <Grid item container fullWidth xs={12}>
              <GridInput label={'Attention'} cols={[3, 6]} />

              <VendorAutoComplete
                control={methods.control}
                variable_name='country_name'
                itemName='country'
                label='Country'
                options={data?.data}
                cols={[3, 6]}
              />
              <VendorAutoComplete
                parent='country'
                addNew
                itemName='state'
                options={states.isSuccess && states?.data?.data}
                variable_name={'state_name'}
                label={'State'}
                cols={[3, 6]}
              />
              <VendorAutoComplete
                parent='state'
                itemName='district'
                options={districts.isSuccess && districts?.data?.data}
                addNew
                label={'District'}
                variable_name='district_name'
                cols={[3, 6]}
              />
              <VendorAutoComplete
                parent='district'
                variable_name={'thana_name'}
                itemName='thana'
                options={thanas.isSuccess && thanas?.data?.data}
                addNew
                label={'City/Thana'}
                cols={[3, 6]}
              />
              <VendorAutoComplete
                parent='thana'
                variable_name={'union_name'}
                options={unions.isSuccess && unions?.data?.data}
                itemName='union'
                addNew
                label={'Union/Village'}
                cols={[3, 6]}
              />
              <VendorAutoComplete
                parent='union'
                variable_name={'zipcode_name'}
                options={zips.isSuccess && zips?.data?.data}
                itemName='zipcode'
                addNew
                label={'Zipcode'}
                cols={[3, 6]}
              />
              <VendorAutoComplete
                parent='zipcode'
                variable_name={'street_name'}
                options={villages.isSuccess && villages?.data?.data}
                itemName='street-address'
                addNew
                label={'Street Address 1'}
                cols={[3, 6]}
              />
              <GridInput label={'Street Address 2'} cols={[3, 6]} />
              <GridInput label={'Phone'} cols={[3, 6]} />
              <GridInput label={'Fax'} cols={[3, 6]} />
            </Grid>
          </form>
        </FormProvider>
      </Grid>
      <Grid item container xs={6}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '30px' }}>
          <Typography variant='h6' color={'secondary'} sx={{ marginBottom: '20px' }}>
            Shipping Address
          </Typography>
          <Button variant='text' startIcon={<Download />}>
            Copy Billing Address
          </Button>
        </Box>
        <GridInput label={'Attention'} cols={[3, 6]} />

        <GridAutocomplete label={'Country'} addNew={true} options={[{ label: 'one' }]} cols={[3, 6]} />
        <GridAutocomplete label={'State'} addNew cols={[3, 6]} />
        <GridAutocomplete label={'District'} addNew cols={[3, 6]} />
        <GridAutocomplete label={'City/Thana'} cols={[3, 6]} />
        <GridAutocomplete label={'Union/Village'} cols={[3, 6]} />
        <GridAutocomplete label={'Zipcode'} cols={[3, 6]} />
        <GridAutocomplete label={'Street Address 1'} cols={[3, 6]} />
        <GridInput label={'Street Address 2'} cols={[3, 6]} />
        <GridInput label={'Phone'} cols={[3, 6]} />
        <GridInput label={'Fax'} cols={[3, 6]} />
      </Grid>
    </Grid>
  )
}

export default SecondTab
