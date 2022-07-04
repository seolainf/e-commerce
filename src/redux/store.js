import { configureStore } from "@reduxjs/toolkit";
import cartReduce from "./cartSlice";
import usersReduce from "./usersSlice";

const store = configureStore({
  reducer: {
    users: usersReduce,
    cart: cartReduce,
  },
});
export default store;
