import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import authenticateReducer from './authenticateSlice'

const store = configureStore({
  reducer: {
    authenticate: authenticateReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
