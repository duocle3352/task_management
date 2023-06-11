import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getIsAuthenticatedFromLS, getProfileFromLS } from '~/utils/auth'
import AuthType from '~/types/auth.type'

interface Types {
  isAuthenticated: boolean
  currentUser: AuthType | null
}

const initialState: Types = {
  isAuthenticated: getIsAuthenticatedFromLS(),
  currentUser: getProfileFromLS()
}

const authenticateSlice = createSlice({
  initialState,
  name: 'authenticate',
  reducers: {
    setIsAuthenticated: (state, actions: PayloadAction<boolean>) => {
      state.isAuthenticated = actions.payload
    },
    setCurrentUser: (state, actions: PayloadAction<AuthType | null>) => {
      state.currentUser = actions.payload
    }
  }
})

const { reducer, actions } = authenticateSlice
export const { setIsAuthenticated, setCurrentUser } = actions
export default reducer
