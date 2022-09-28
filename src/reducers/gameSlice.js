import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  disabled: false,
  timeIsOver: false,
  countdownTime: 0,
  firstClick: false
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    disableClick: (state, action) => {
      state.disabled = action.payload
    },
    setFirstClick: (state, action) => {
      state.firstClick = action.payload
    },
    setTimeEnded: (state, action) => {
      state.timeIsOver = action.payload
    },
    setCountdownTime: (state, action) => {
      state.countdownTime = action.payload
    }
  }
})

export const { disableClick, setFirstClick, setTimeEnded, setCountdownTime } = gameSlice.actions
export default gameSlice.reducer
