import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  item: []
}

export const purchaseOrderSlice = createSlice({
  name: 'purchaseOrder',
  initialState,
  reducers: {
    addItem: state => {
      state.item = [...state.item, { new: 'new' }]
    },
    removeItem: state => {
      const oldVal = [...state.item]
      oldVal.pop()
      state.item = [...oldVal]
    }
  }
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem } = purchaseOrderSlice.actions

export default purchaseOrderSlice.reducer