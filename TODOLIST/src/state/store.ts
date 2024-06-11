import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterslice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDisptach = typeof store.dispatch;
