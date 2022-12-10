import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current_user: null,
};

export const userSlice = createSlice({
  name: "current_user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.current_user = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
