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
    streetAddress: '',
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
    streetAddress: '',
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
    copyBillingToShipping: (state) => {
      state.shipping = state.billing
    },
    updateShippingAddress: (state, action) => {
      state.shipping = action.payload
    },
    updateGlobalInBillingAddress: (state, action) => {
      state.billing = action.payload
    },
    updateGlobalInShippingAddress: (state, action) => {
      state.shipping = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { updateBillingAddress, copyBillingToShipping, updateShippingAddress, updateGlobalInBillingAddress, updateGlobalInShippingAddress } = vendorSlice.actions

export default vendorSlice.reducer