import { Autocomplete, Grid, InputLabel, TextField } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import AutoCompleteAddNew from 'src/@bderp-core/components/FromFields/AutoCompleteAddNew'
import {
  useGetCurrencyQuery,
  useGetPaymentQuery,
  useGetTaxQuery
} from 'src/store/service/vendor'

const FirstTab = () => {
  const methods = useForm()

  const currency = useGetCurrencyQuery("cur")
  const tax = useGetTaxQuery("tax")
  const payment = useGetPaymentQuery("pay")

  const onSubmit = (values:any) => {
    console.log(values)
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container rowGap={2}>
          <AutoCompleteAddNew
            control={methods.control}
            variable_name='name'
            itemName='currency'
            label='Currency'
            options={currency?.data?.data}
          />
          <AutoCompleteAddNew
            control={methods.control}
            variable_name='name'
            itemName='tax'
            label='Tax Rate'
            options={tax?.data?.data}
          />
          <AutoCompleteAddNew
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