import { createSlice } from '@reduxjs/toolkit'

const ActiveProtos = createSlice({
  name: 'activeProtos',
  initialState: [],
  reducers: {
    setActiveProtos(state, action) {
      return action.payload
    },
  }
})

export const { setActiveProtos } = ActiveProtos.actions

export const setAllActiveList = (protos) => {
  return (dispatch) => {
    dispatch(setActiveProtos(protos))
  }
}

export default ActiveProtos.reducer