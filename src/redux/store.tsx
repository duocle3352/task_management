import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import authenticateReducer from './authenticateSlice'
import menuReducer from './menuSlice'

const store = configureStore({
  reducer: {
    menu: menuReducer,
    authenticate: authenticateReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
