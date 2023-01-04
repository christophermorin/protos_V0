import { createSlice } from '@reduxjs/toolkit'

const ProtoSlice = createSlice({
  name: 'protos',
  initialState: [],
  reducers: {
    setAllProtos(state, action) {
      return action.payload
    }
  }
})

export const { setAllProtos } = ProtoSlice.actions

export const setProtos = (protos) => {
  return (dispatch) => {
    dispatch(setAllProtos(protos))
  }
}

export default ProtoSlice.reducer