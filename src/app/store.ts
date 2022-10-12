import { configureStore } from "@reduxjs/toolkit";
import machineReducer from "../features/machineSlice";

const store = configureStore({
  reducer: {
    machineReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
