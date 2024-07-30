import { configureStore } from '@reduxjs/toolkit';
import userInfoReducer from "@/lib/features/userInfoSlice"
import todoReducer from "@/lib/features/todoSlice";
import searchReducer from "@/lib/features/searchSlice";


export const makeStore = () => {
  return configureStore({
    reducer: {
      userInfo: userInfoReducer,
      todos: todoReducer,
      search: searchReducer,

    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']