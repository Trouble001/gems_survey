import { configureStore } from '@reduxjs/toolkit'
import studentReducer from './slices/studentSlice'
import villageReducer from './slices/villageSlice'

export const store = configureStore({
  reducer: {
    students: studentReducer,
    villages: villageReducer,
  },
})

export default store
