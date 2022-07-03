import { createSlice } from "@reduxjs/toolkit";

const users =
  localStorage.getItem("users") !== null
    ? JSON.parse(localStorage.getItem("users"))
    : [];

const initialState = { value: users };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const currentUser = action.payload;
      state.value.push(currentUser);
      localStorage.setItem("users", JSON.stringify(state.value));
    },
    deleteUser: (state, action) => {
      const userId = action.payload;
      console.log(userId);
      state.value = state.value.filter((user) => user.uid !== userId.uid);
      localStorage.setItem("users", JSON.stringify(state.value));
    },
  },
});
export const { setUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
