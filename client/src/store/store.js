import { configureStore } from '@reduxjs/toolkit'
import protosReducer from '../reducers/protosReducer'

const store = configureStore({
  reducer: {
    protos: protosReducer
  }
})

export default store