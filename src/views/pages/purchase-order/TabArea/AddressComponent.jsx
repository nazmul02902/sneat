import { Autocomplete, Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import GridInput from 'src/@core/components/FormFields/GridInput'
import VendorAutoComplete from 'src/@core/components/FormFields/VendorAutoComplete'
import { updateBillingAddress, updateShippingAddress } from 'src/store/apps/vendor'
import {
  useGetCountryQuery,
  useGetDistrictsQuery,
  useGetGlobalAddressQuery,
  useGetStatesQuery,
  useGetStreetsQuery,
  useGetThanasQuery,
  useGetUnionsQuery,
  useGetZipcodeQuery
} from 'src/store/services/vendor'

const AddressComponent = ({ domain, initialVal }) => {
  const methods = useForm()
  const globalMethods = useForm()

  const fieldsVal = methods.watch()
  const globalField = globalMethods.watch()
  console.log(globalField)

  const dispatch = useDispatch()
  //redux
    const { data } = useGetCountryQuery('vendor')
    const states = useGetStatesQuery(fieldsVal?.country?.iso2)
    const districts = useGetDistrictsQuery(fieldsVal?.state?.id)
    const thanas = useGetThanasQuery(fieldsVal?.district?.id)
    const unions = useGetUnionsQuery(fieldsVal?.thana?.id)
    const zips = useGetZipcodeQuery(fieldsVal?.union?.id)
    const villages = useGetStreetsQuery(fieldsVal?.zipcode?.id)

  const global = useGetGlobalAddressQuery(globalField?.address)
  

  const onSubmit = values => {
    if (domain === 'billing') {
      dispatch(updateBillingAddress(values))
    } else if (domain === 'shipping') {
      dispatch(updateShippingAddress(values))
    }
  }

  return (
    <>
      <form action='' style={{ width: '100%' }}>
        <Grid item container fullWidth xs={12}>
          <Autocomplete
            id='combo-box-demo'
            options={['one', 'two']}
            sx={{ width: 300 }}
            size='small'
            name="address"
            renderInput={params => <TextField {...params} label='Movie' />}
          />
        </Grid>
      </form>
      <FormProvider {...methods} key={domain}>
        <form key={domain} action='' fullWidth onBlur={methods.handleSubmit(onSubmit)}>
          <Grid item container fullWidth xs={12}>
            <GridInput initialVal={initialVal?.attention} itemName='attention' label={'Attention'} cols={[3, 6]} />

            <VendorAutoComplete
              control={methods.control}
              variable_name='country_name'
              itemName='country'
              label='Country'
              options={data?.data}
              cols={[3, 6]}
              initialVal={initialVal?.country}
            />
            <VendorAutoComplete
              parent='country'
              addNew
              itemName='state'
              options={states.isSuccess && states?.data?.data}
              variable_name={'state_name'}
              label={'State'}
              cols={[3, 6]}
              initialVal={initialVal?.state ?? ''}
            />
            <VendorAutoComplete
              parent='state'
              itemName='district'
              options={districts.isSuccess && districts?.data?.data}
              addNew
              label={'District'}
              variable_name='district_name'
              cols={[3, 6]}
              initialVal={initialVal?.district ?? ''}
            />
            <VendorAutoComplete
              parent='district'
              variable_name={'thana_name'}
              itemName='thana'
              options={thanas.isSuccess && thanas?.data?.data}
              addNew
              label={'City/Thana'}
              cols={[3, 6]}
              initialVal={initialVal?.thana ?? ''}
            />
            <VendorAutoComplete
              parent='thana'
              variable_name={'union_name'}
              options={unions.isSuccess && unions?.data?.data}
              itemName='union'
              addNew
              label={'Union/Village'}
              cols={[3, 6]}
              initialVal={initialVal?.union ?? ''}
            />
            <VendorAutoComplete
              parent='union'
              variable_name={'zip_code'}
              options={zips.isSuccess && zips?.data?.data}
              itemName='zipcode'
              addNew
              label={'Zipcode'}
              cols={[3, 6]}
              initialVal={initialVal?.zipcode ?? ''}
            />
            <VendorAutoComplete
              parent='zipcode'
              variable_name={'street_address_value'}
              options={villages.isSuccess && villages?.data?.data}
              itemName='streetAddress'
              addNew
              label={'Street Address 1'}
              cols={[3, 6]}
              initialVal={initialVal?.street}
            />
            <GridInput
              initialVal={initialVal?.address_two}
              itemName='address_two'
              label={'Street Address 2'}
              cols={[3, 6]}
            />
            <GridInput initialVal={initialVal?.phone} itemName='phone' label={'Phone'} cols={[3, 6]} />
            <GridInput initialVal={initialVal?.fax} itemName='fax' label={'Fax'} cols={[3, 6]} />
          </Grid>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressComponent
