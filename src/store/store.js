import { configureStore } from '@reduxjs/toolkit'
import purchaseOrderReducer from './features/purchaseOrderSlice'

export const store = configureStore({
  reducer: {
    purchaseOrder: purchaseOrderReducer
  }
})
