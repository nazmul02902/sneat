import { Autocomplete, Grid, InputLabel, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import GridInput from 'src/bderp-@core/components/FormFields/GridInput'
import VendorAutoComplete from 'src/bderp-@core/components/FormFields/VendorAutoComplete'
import {
  updateBillingAddress,
  updateGlobalInBillingAddress,
  updateGlobalInShippingAddress,
  updateShippingAddress
} from 'src/store/apps/vendor'
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
  const [searchTerm, setSearchTerm] = useState('')
  // const [initialVal, setInitialVal] = useState(initialValue);

  const fieldsVal = methods.watch()
  const dispatch = useDispatch()
  const [timeoutId, setTimeoutId] = useState(null)
  //redux
  const { data } = useGetCountryQuery('vendor')
  const states = useGetStatesQuery(fieldsVal?.country && fieldsVal?.country?.iso2)
  const districts = useGetDistrictsQuery(fieldsVal?.state?.id)
  const thanas = useGetThanasQuery(fieldsVal?.district?.id)
  const unions = useGetUnionsQuery(fieldsVal?.thana?.id)
  const zips = useGetZipcodeQuery(fieldsVal?.union?.id)
  const villages = useGetStreetsQuery(fieldsVal?.zipcode?.id)
  const globalData = useGetGlobalAddressQuery(searchTerm)

  const onSubmit = values => {
    if (domain === 'billing') {
      dispatch(updateBillingAddress(values))
    } else if (domain === 'shipping') {
      dispatch(updateShippingAddress(values))
    }
  }

  const handleInputChange = (event, val, reason) => {
    if (reason !== 'input') return
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setTimeoutId(
      setTimeout(() => {
        setSearchTerm(val)
      }, 500)
    )
  }

  return (
    <>
      <FormProvider {...methods} key={domain}>
        <form key={domain} action='' fullWidth onBlur={methods.handleSubmit(onSubmit)}>
          <Grid item container fullWidth xs={12}>
            <Grid container item xs={12} sx={{ marginY: '10px' }}>
              <Grid item xs={9}>
                <Autocomplete
                  options={globalData.isSuccess ? globalData?.data?.data : []}
                  size='small'
                  getOptionLabel={option => option.plain_address}
                  onChange={(e, newVal) => {
                    if (domain === 'billing') {
                      dispatch(updateGlobalInBillingAddress(newVal?.full_address))
                    } else if (domain === 'shipping') {
                      dispatch(updateGlobalInShippingAddress(newVal?.full_address))
                    }
                  }}
                  onInputChange={handleInputChange}
                  id='combo-box-demo'
                  renderInput={params => <TextField {...params} label='Type Address/City/Zipcode' />}
                />
              </Grid>
            </Grid>
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
              refetch={states.refetch}
              isFetching={states.isFetching}
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
              refetch={districts.refetch}
              isFetching={districts.isFetching}
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
              refetch={thanas.refetch}
              isFetching={thanas.isFetching}
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
              refetch={unions.refetch}
              isFetching={unions.isFetching}
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
              refetch={zips.refetch}
              isFetching={zips.isFetching}
            />
            <VendorAutoComplete
              parent='zipcode'
              variable_name={'street_address_value'}
              options={villages.isSuccess && villages?.data?.data}
              itemName='streetAddress'
              addNew
              label={'Street Address'}
              cols={[3, 6]}
              initialVal={initialVal?.streetAddress}
              refetch={villages.refetch}
              isFetching={villages.isFetching}
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
