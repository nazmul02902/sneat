import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  billing: {
    attention: '',
    country: { country_name: '' },
    state: { state_name: '' },
    district: { district_name: '' },
    thana: { thana_name: '' },
    union: { union_name: '' },
    zipcode: { zip_code: '' },
    address_one: '',
    address_two: '',
    phone: '',
    fax: ''
  },
  shipping: {
    attention: '',
    country: { country_name: '' },
    state: { state_name: '' },
    district: { district_name: '' },
    thana: { thana_name: '' },
    union: { union_name: '' },
    zipcode: { zip_code: '' },
    address_one: '',
    address_two: '',
    phone: '',
    fax: ''
  }
}

export const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    updateBillingAddress: (state, action) => {
      state.billing = action.payload
    },
    copyBillingToShipping: (state, action) => {
      // const reduce_undefined = Object.entries(state.billing)
      //   .filter(([key, value]) => value !== undefined)
      //   .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

      // state.shipping = Object.assign({}, state.shipping, reduce_undefined)
      state.shipping = state.billing
    },
    updateShippingAddress: (state, action) => {
      state.shipping = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateBillingAddress, copyBillingToShipping, updateShippingAddress } = vendorSlice.actions

export default vendorSlice.reducer
