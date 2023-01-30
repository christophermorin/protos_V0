import { createSlice } from '@reduxjs/toolkit';

const DisplayedProtos = createSlice({
  name: 'displayedProtos',
  initialState: [],
  reducers: {
    buildList(state, action) {
      return [...state, action.payload];
    },
    clearList(state, action) {
      return [];
    },
    removeOneProto(state, action) {
      return state.filter((proto) => proto._id !== action.payload);
    },
    updateList(state, action) {
      const newProto = action.payload;
      return state.map((proto) => (proto._id === newProto._id ? newProto : proto));
    },
  },
});

export const {
  buildList, removeOneProto, clearList, updateList,
} = DisplayedProtos.actions;

export const displayedAddOne = (proto) => (dispatch) => {
  dispatch(buildList(proto));
};

export const displayedRemoveOne = (protoId) => (dispatch) => {
  dispatch(removeOneProto(protoId));
};

export const clearDisplayProtoList = () => (dispatch) => {
  dispatch(clearList());
};

export const displayedUpdateList = (newProto) => (dispatch) => {
  dispatch(updateList(newProto));
};

export default DisplayedProtos.reducer;
