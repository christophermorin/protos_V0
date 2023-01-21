import { createSlice } from '@reduxjs/toolkit'

const ActiveProtos = createSlice({
  name: 'activeProtos',
  initialState: null,
  reducers: {
    setNewActiveProtos(state, action) {
      return action.payload
    },
    addOne(state, action) {
      return [...state, action.payload]
    }
  }
})

export const { setNewActiveProtos, addOne } = ActiveProtos.actions

export const setActiveProtos = (protos) => {
  return (dispatch) => {
    dispatch(setNewActiveProtos(protos))
  }
}

export const addOneProto = (proto) => {
  return (dispatch) => {
    dispatch(addOne(proto))
  }
}

export default ActiveProtos.reducer