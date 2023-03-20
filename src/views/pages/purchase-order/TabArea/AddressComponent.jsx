import { Download } from '@mui/icons-material'
import { Button, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import GridInput from 'src/@core/components/FormFields/GridInput'
import VendorAutoComplete from 'src/@core/components/FormFields/VendorAutoComplete'
import { updateBillingAddress } from 'src/store/apps/vendor'
import {
  useGetCountryQuery,
  useGetDistrictsQuery,
  useGetStatesQuery,
  useGetStreetsQuery,
  useGetThanasQuery,
  useGetUnionsQuery,
  useGetZipcodeQuery
} from 'src/store/services/vendor'

const AddressComponent = ({key, initialVal}) => {
  console.log(initialVal);
  const methods = useForm()
  const fieldsVal = methods.watch()
  const dispatch = useDispatch()
  const {vendor} = useSelector(state => state)
  //redux
  const { data } = useGetCountryQuery('vendor')
  const states = useGetStatesQuery(fieldsVal?.country?.iso2)
  const districts = useGetDistrictsQuery(fieldsVal?.state?.id)
  const thanas = useGetThanasQuery(fieldsVal?.district?.id)
  const unions = useGetUnionsQuery(fieldsVal?.thana?.id)
  const zips = useGetZipcodeQuery(fieldsVal?.union?.id)
  const villages = useGetStreetsQuery(fieldsVal?.zipcode?.id)
  const onSubmit = values => {
    console.log(values)
    dispatch(updateBillingAddress(values))
  }

  return (
    <FormProvider {...methods} key={key}>
      <form key={key} action='' fullWidth onBlur={methods.handleSubmit(onSubmit)}>
        
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
            variable_name={'zip_code'}
            options={zips.isSuccess && zips?.data?.data}
            itemName='zipcode'
            addNew
            label={'Zipcode'}
            cols={[3, 6]}
          />
          <VendorAutoComplete
            parent='zipcode'
            variable_name={'street_address_value'}
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
  )
}

export default AddressComponent