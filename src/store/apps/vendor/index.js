import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  billing: {},
  shipping: {}
}

export const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    updateBillingAddress: (state, payload) => {
      state.billing = payload
    },
    copyBillingToShipping: (state, payload) => {
      state.shipping = { ...state.billing }
    },
    updateShippingAddress: (state, payload) => {
      state.shipping = payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateBillingAddress, copyBillingToShipping, updateShippingAddress } = vendorSlice.actions

export default vendorSlice.reducer
