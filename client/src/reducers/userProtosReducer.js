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
  },
});

export const { setAllProtos, addFromBuild } = UserProtos.actions;

export const setUserProtosList = (protos) => (dispatch) => {
  dispatch(setAllProtos(protos));
};
// Adds recently built proto to user proto lists in dropdowns
export const userProtosAddOne = (proto) => (dispatch) => {
  dispatch(addFromBuild(proto));
};

export default UserProtos.reducer;
