import { createSlice } from '@reduxjs/toolkit'

const DisplayedProtos = createSlice({
  name: 'displayedProtos',
  initialState: [],
  reducers: {
    buildList(state, action) { // Using the tabs click
      return [...state, action.payload]
    },
    clearList(state, action) {
      return []
    },
    removeOneProto(state, action) { // Using the tabs click
      return state.filter(proto => proto.id !== action.payload.id)
    },
    updateList(state, action) {
      const newProto = action.payload
      return state.map(proto => proto.id === newProto.id ? newProto : proto)
    },
    protoWasDeleted(state, action) {
      return state.filter(proto => proto.id !== action.payload)
    },
    // updateOneJob(state, action) {
    //   const protos = action.payload
    //   const result = state.map(proto => proto.id)
    //   const test = []
    //   for (let i = 0; i < result.length; i++) {
    //     for (let j = 0; j < protos.length; j++) {
    //       if (result[i] === protos[j].id) {
    //         test.push(protos[j])
    //       }
    //     }
    //   }
    //   return test
    // }
  }
})

export const { buildList, removeOneProto, protoWasDeleted, clearList, updateList } = DisplayedProtos.actions



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

export const clearDisplayProtoList = () => {
  return (dispatch) => {
    dispatch(clearList())
  }
}

export const updateDisplayedList = (newProto) => {
  return (dispatch) => {
    dispatch(updateList(newProto))
  }
}

// export const updateJobFromDisplayedList = (protos) => {
//   return (dispatch) => {
//     dispatch(updateOneJob(protos))
//   }
// }

export default DisplayedProtos.reducer