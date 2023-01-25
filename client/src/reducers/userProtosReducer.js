import { createSlice } from '@reduxjs/toolkit'

const UserProtos = createSlice({
  name: 'userProtos',
  initialState: [],
  reducers: {
    setAllProtos(state, action) {
      return action.payload
    },
    addFromBuild(state, action) {
      console.log('here')
      return [...state, action.payload]
    }
  }
})

export const { setAllProtos, addFromBuild } = UserProtos.actions

export const setAllProtosList = (protos) => {
  return (dispatch) => {
    dispatch(setAllProtos(protos))
  }
}

export const addOneFromBuild = (proto) => {
  return (dispatch) => {
    dispatch(addFromBuild(proto))
  }
}

export default UserProtos.reducer