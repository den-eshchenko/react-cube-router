import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isSimpleAnimation: false
}

export const counterSlice = createSlice({
  name: 'simpleAnimation',
  initialState,
  reducers: {
    changeType: (state) => {
      state.isSimpleAnimation = !state.isSimpleAnimation
    },
  },
})

export const { changeType } = counterSlice.actions