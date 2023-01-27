import { createSlice } from '@reduxjs/toolkit'

const ActiveProtos = createSlice({
  name: 'activeProtos',
  initialState: null,
  reducers: {
    setNewActiveProtos(state, action) {
      return action.payload
    },
    addOne(state, action) {
      const newActiveList = state
      newActiveList.activeProtos.push(action.payload)
      return newActiveList
    },
  }
})

export const { setNewActiveProtos, addOne } = ActiveProtos.actions

export const setActiveProtos = (protos) => {
  return (dispatch) => {
    dispatch(setNewActiveProtos(protos))
  }
}

export const activeProtoAddOne = (proto) => {
  console.log(proto)
  return (dispatch) => {
    dispatch(addOne(proto))
  }
}

export default ActiveProtos.reducer