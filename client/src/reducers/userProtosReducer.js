import { createSlice } from '@reduxjs/toolkit'

const UserProtos = createSlice({
  name: 'userProtos',
  initialState: [],
  reducers: {
    setAllProtos(state, action) {
      return action.payload
    },
  }
})

export const { setAllProtos } = UserProtos.actions

export const setAllProtosList = (protos) => {
  return (dispatch) => {
    dispatch(setAllProtos(protos))
  }
}

export default UserProtos.reducer