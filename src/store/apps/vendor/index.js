import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  billing: {},
  shipping:{}
}

export const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    updateBillingAddress: (state, payload) => {
        state.billing = payload
    },
    copyBillingToShipping: (state, payload) => {
      state.shipping = state.billing
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateBillingAddress, copyBillingToShipping } = vendorSlice.actions

export default vendorSlice.reducer