import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem('token') || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.user
      localStorage.setItem('token', action.payload.token)
    },
    logout: (state) => {
      state.token = null
      state.user = null
      localStorage.removeItem('token')
    },
    setUser: (state, action) => {
    state.user = action.payload
    },
  },
})

export const { loginSuccess, logout, setUser } = authSlice.actions
export default authSlice.reducer
