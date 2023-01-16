import { createSlice } from '@reduxjs/toolkit'

const UserAuth = createSlice({
  name: 'userAuth',
  initialState: null,
  reducers: {
    setUserAuth(state, action) {
      return action.payload
    },
  }
})

export const { setUserAuth } = UserAuth.actions

export const setAuth = (token) => {
  return (dispatch) => {
    dispatch(setUserAuth(token))
  }
}

export default UserAuth.reducer