import { configureStore } from "@reduxjs/toolkit";
import usersReduce from "./usersSlice";

const store = configureStore({
  reducer: {
    users: usersReduce,
  },
});
export default store;
