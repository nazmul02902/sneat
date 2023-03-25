import { Autocomplete, Grid, InputLabel, TextField } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import GridAutocomplete from 'src/bderp-@core/components/FormFields/GridAutocomplete'
import VendorAutoComplete from 'src/bderp-@core/components/FormFields/VendorAutoComplete'
import {
  useGetCurrencyQuery,
  useGetCurTaxPayQuery,
  useGetPaymentQuery,
  useGetTaxQuery
} from 'src/store/services/vendor'

const FirstTab = () => {
  const methods = useForm()

  const currency = useGetCurrencyQuery()
  const tax = useGetTaxQuery()
  const payment = useGetPaymentQuery()

  const onSubmit = values => {
    console.log(values)
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container>
          <VendorAutoComplete
            control={methods.control}
            variable_name='name'
            itemName='currency'
            label='Currency'
            options={currency?.data?.data}
          />
          <VendorAutoComplete
            control={methods.control}
            variable_name='name'
            itemName='tax'
            label='Tax Rate'
            options={tax?.data?.data}
          />
          <VendorAutoComplete
            control={methods.control}
            variable_name='name'
            itemName='payment'
            label='Payment Term'
            options={payment?.data?.data}
          />
        </Grid>
      </form>
    </FormProvider>
  )
}

export default FirstTab
