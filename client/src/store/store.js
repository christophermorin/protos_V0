import { configureStore } from '@reduxjs/toolkit';
import userProtosReducer from '../reducers/userProtosReducer';
import activeProtosReducer from '../reducers/activeProtosReducer';
import userAuthReducer from '../reducers/userAuthReducer';
import displayedProtosReducer from '../reducers/displayedProtosReducer';
import notificationsReducer from '../reducers/notificationsReducer';

const store = configureStore({
  reducer: {
    userProtos: userProtosReducer,
    activeProtos: activeProtosReducer,
    userAuth: userAuthReducer,
    displayedProtos: displayedProtosReducer,
    notifications: notificationsReducer,
  },
});

export default store;
