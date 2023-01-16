import { configureStore } from '@reduxjs/toolkit'
import userProtosReducer from '../reducers/userProtosReducer'
import activeProtosReducer from '../reducers/activeProtosReducer'
import userAuthReducer from '../reducers/userAuthReducer'

const store = configureStore({
  reducer: {
    userProtos: userProtosReducer,
    activeProtos: activeProtosReducer,
    userAuth: userAuthReducer
  }
})

export default store