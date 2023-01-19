import { createSlice } from '@reduxjs/toolkit'

const DisplayedProtos = createSlice({
  name: 'displayedProtos',
  initialState: [],
  reducers: {
    buildList(state, action) {
      return [...state, action.payload]
    },
    removeOneProto(state, action) {
      return state.filter(proto => proto.id !== action.payload.id)
    },
    protoWasDeleted(state, action) {
      return state.filter(proto => proto.id !== action.payload)
    }
  }
})

export const { buildList, removeOneProto, protoWasDeleted } = DisplayedProtos.actions



export const addProto = (proto) => {
  return (dispatch) => {
    dispatch(buildList(proto))
  }
}

export const removeProto = (proto) => {
  return (dispatch) => {
    dispatch(removeOneProto(proto))
  }
}

export const protoDeleted = (protoId) => {
  return (dispatch) => {
    dispatch(protoWasDeleted(protoId))
  }
}

export default DisplayedProtos.reducer