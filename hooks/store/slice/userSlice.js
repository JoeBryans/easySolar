import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../localStorage";

const initialState = {
  credit: 0,

  user: {},
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      setItem("user", action.payload);
    },
    setCredit: (state, action) => {
      state.credit = action.payload;
      //   setItem("credit", action.payload);
    },
  },
});

export const { setUser, setCredit } = userSlice.actions;

export default userSlice.reducer;
