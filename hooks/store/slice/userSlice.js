import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../localStorage";
if (typeof window !== "undefined") window.localStorage.getItem("plan");
const saveState = (state) => {
  try {
    // const serializedState = JSON.stringify(state);
    localStorage.setItem("plan", state);
  } catch (err) {
    // console.error(err);
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("plan");
    return serializedState ? JSON.parse(serializedState) : null;
  } catch (err) {
    return null;
  }
};
const initialState = {
  credit: 0,
  plan: loadState(),
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
    SelectdPlan: (state, action) => {
      state.plan = action.payload;
      saveState(state.plan);
    },
  },
});

export const { setUser, setCredit, SelectdPlan } = userSlice.actions;

export default userSlice.reducer;
