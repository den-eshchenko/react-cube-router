import { createSlice } from "@reduxjs/toolkit"

export type TAuthSlice = {
  isAuth: boolean
  login: string | null
}

const initialState: TAuthSlice = {
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