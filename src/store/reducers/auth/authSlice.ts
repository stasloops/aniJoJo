import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

// export const sendSMS = createAsyncThunk(
//   'auth/sendSMS',
//   async (phone) => {
//     const response = await $request.post(`/confirm_phone`, phone)
//     return response.data
//   }
// )

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    errors: null
  },
  reducers: {
    getUser(state, action) {
      state.user = action.payload
    },
    resetUser(state) {
      state.user = {}
    }
  },
  extraReducers: {
    // [sendSMS.fulfilled]: (state, action) => {
    //   state.result = action.payload.result
    // },
    // [validationSMS.fulfilled]: (state, action) => {
    //   state.result = action.payload.result
    //   state.token = action.payload.data.pass_token
    // },
    // [getUser.fulfilled]: (state, action) => {
    //   state.result = action.payload.result
    //   state.user = action.payload.data
    // }
  }
})

export const { getUser, resetUser } = authSlice.actions
export default authSlice.reducer