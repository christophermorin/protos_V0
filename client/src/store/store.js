import { configureStore } from '@reduxjs/toolkit'
import userProtosReducer from '../reducers/userProtosReducer'
import activeProtosReducer from '../reducers/activeProtosReducer'

const store = configureStore({
  reducer: {
    userProtos: userProtosReducer,
    activeProtos: activeProtosReducer
  }
})

export default store