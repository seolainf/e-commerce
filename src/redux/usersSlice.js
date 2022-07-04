import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserById } from "../firebase/firebaseFunc";

const users =
  localStorage.getItem("users") !== null
    ? JSON.parse(localStorage.getItem("users"))
    : [];

const initialState = { value: users };

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId, thunkAPI) => {
    const res = await getUserById(userId);
    return res;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteUser: (state, action) => {
      const userId = action.payload;
      state.value = state.value.filter((user) => user.uid !== userId.uid);
      localStorage.setItem("users", JSON.stringify(state.value));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state, action) => {
        console.log("loading");
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.value.push(action.payload);
        localStorage.setItem("users", JSON.stringify(state.value));
      });
  },
});
export const { setUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
