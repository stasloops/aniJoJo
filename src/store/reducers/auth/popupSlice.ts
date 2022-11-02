import { createSlice } from "@reduxjs/toolkit"

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    settingPopup: false,
  },
  reducers: {
    setSettingPopup(state, action) {
      state.settingPopup = action.payload
    }
  }
})

export const { setSettingPopup } = popupSlice.actions
export default popupSlice.reducer