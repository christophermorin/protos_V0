import { createSlice } from '@reduxjs/toolkit';

const DisplayedProtos = createSlice({
  name: 'displayedProtos',
  initialState: [],
  reducers: {
    buildList(state, action) { // Using the tabs click
      return [...state, action.payload];
    },
    clearList(state, action) {
      return [];
    },
    removeOneProto(state, action) { // Using the tabs click
      return state.filter((proto) => proto._id !== action.payload._id);
    },
    updateList(state, action) {
      const newProto = action.payload;
      return state.map((proto) => (proto._id === newProto._id ? newProto : proto));
    },
    protoWasDeleted(state, action) {
      return state.filter((proto) => proto._id !== action.payload);
    },
  },
});

export const {
  buildList, removeOneProto, protoWasDeleted, clearList, updateList,
} = DisplayedProtos.actions;

export const displayedAddOne = (proto) => (dispatch) => {
  dispatch(buildList(proto));
};

export const displayedRemoveOne = (proto) => (dispatch) => {
  dispatch(removeOneProto(proto));
};

export const protoDeleted = (protoId) => (dispatch) => {
  dispatch(protoWasDeleted(protoId));
};

export const clearDisplayProtoList = () => (dispatch) => {
  dispatch(clearList());
};

export const displayedUpdateList = (newProto) => (dispatch) => {
  dispatch(updateList(newProto));
};

// export const updateJobFromDisplayedList = (protos) => {
//   return (dispatch) => {
//     dispatch(updateOneJob(protos))
//   }
// }

export default DisplayedProtos.reducer;
