import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpenMenu: false
}

const menuSlice = createSlice({
  initialState,
  name: 'menu',
  reducers: {
    toggleMenu: (state) => {
      state.isOpenMenu = !state.isOpenMenu
    }
  }
})

const { actions, reducer } = menuSlice
export const { toggleMenu } = actions
export default reducer
