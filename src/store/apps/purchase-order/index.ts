import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState: any = {
  items: []
}

export const purchaseOrderSlice = createSlice({
  name: 'purchaseOrder',
  initialState,
  reducers: {
    addItem: state => {
      const isAddable = state.items.some((each: any) => !each.isEditable)
      state.items =
        isAddable || !state.items.length
          ? [...state.items, { id: uuidv4(), new: 'new', isEditable: true }]
          : state.items
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item: any) => item.id !== action.payload)
    },
    updateItem: (state, action) => {
      state.items = state.items.map((each: any) => {
        if (each.id === action.payload.id) {
          return { ...action.payload, isEditable: false }
        }
        return each
      })
    },
    makeEditable: (state, action) => {
      state.items = state.items.map((each: any) => {
        if (each.id === action.payload) {
          return { ...each, isEditable: true }
        }
        return { ...each, isEditable: false }
      })
    }
  }
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, updateItem, makeEditable } = purchaseOrderSlice.actions

export default purchaseOrderSlice.reducer
