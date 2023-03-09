import { createSlice } from "@reduxjs/toolkit";

const Notifications = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    createNewNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return null
    }
  },
});

export const { createNewNotification, clearNotification } = Notifications.actions;

export const setNotification = (notification) => (dispatch) => {
  dispatch(createNewNotification(notification));
};

export const resetNotification = () => (dispatch) => {
  setTimeout(() => {
    dispatch(clearNotification())
  }, 3000)
}

export default Notifications.reducer;