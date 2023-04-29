import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isAuth: false,
  login: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeAuth: (state) => {
      state.isAuth = !state.isAuth
    },
    changeLogin: (state, actions) => {
      state.login = actions.payload
    }
  },
})

export const { changeAuth, changeLogin } = authSlice.actions