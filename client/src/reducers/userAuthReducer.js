import { createSlice } from '@reduxjs/toolkit';

const UserAuth = createSlice({
  name: 'userAuth',
  initialState: null,
  reducers: {
    setAuth(state, action) {
      return action.payload;
    },
  },
});

export const { setAuth } = UserAuth.actions;

export const setUserAuth = (token) => (dispatch) => {
  dispatch(setAuth(token));
};

export default UserAuth.reducer;
