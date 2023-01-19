import { createSlice } from '@reduxjs/toolkit'

const ActiveProtos = createSlice({
  name: 'activeProtos',
  initialState: null,
  reducers: {
    setActiveProtos(state, action) {
      return action.payload
    },
    addOne(state, action) {
      return [...state, action.payload]
    }
  }
})

export const { setActiveProtos, addOne } = ActiveProtos.actions

export const setAllActiveList = (protos) => {
  return (dispatch) => {
    dispatch(setActiveProtos(protos))
  }
}

export const addOneProto = (proto) => {
  return (dispatch) => {
    dispatch(addOne(proto))
  }
}

export default ActiveProtos.reducer