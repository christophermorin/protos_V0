import { createSlice } from '@reduxjs/toolkit';

const UserProtos = createSlice({
  name: 'userProtos',
  initialState: [],
  reducers: {
    setAllProtos(state, action) {
      return action.payload;
    },
    addFromBuild(state, action) {
      return [...state, action.payload];
    },
    deleteUserProto(state, action) {
      const deletedProto = action.payload;
      return state.filter((proto) => proto._id !== deletedProto);
    },
  },
});

export const { setAllProtos, addFromBuild, deleteUserProto } = UserProtos.actions;

export const setUserProtosList = (protos) => (dispatch) => {
  dispatch(setAllProtos(protos));
};

export const userProtosAddOne = (proto) => (dispatch) => {
  dispatch(addFromBuild(proto));
};

export const userProtosRemoveOne = (proto) => (dispatch) => {
  dispatch(deleteUserProto(proto));
};

export default UserProtos.reducer;
