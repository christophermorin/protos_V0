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
      console.log(action.payload)
      const deletedProto = action.payload;
      return state.filter((proto) => proto._id !== deletedProto);
    },
  },
});

export const { setAllProtos, addFromBuild, deleteUserProto } = UserProtos.actions;

export const setUserProtosList = (protos) => (dispatch) => {
  dispatch(setAllProtos(protos));
};

// Adds recently built proto to lists in dropdowns
export const userProtosAddOne = (proto) => (dispatch) => {
  dispatch(addFromBuild(proto));
};

// Delete proto from library
export const userProtosRemoveOne = (proto) => (dispatch) => {
  console.log(proto)
  dispatch(deleteUserProto(proto));
};

export default UserProtos.reducer;
