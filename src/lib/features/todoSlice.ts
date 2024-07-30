import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoState } from "../interfaces/interfaces";

const initialState: TodoState = {
  "To Do": [],
  "In Progress": [],
  "Under Review": [],
  "Finished": [],
  todosUpdated: false,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<TodoState>) => {
      const payload = action.payload;

      // Reset the state to avoid stale data
      state["To Do"] = [];
      state["In Progress"] = [];
      state["Under Review"] = [];
      state["Finished"] = [];

      // Push items into their respective arrays
      payload["To Do"].forEach((item) => state["To Do"].push(item));
      payload["In Progress"].forEach((item) => state["In Progress"].push(item));
      payload["Under Review"].forEach((item) => state["Under Review"].push(item));
      payload["Finished"].forEach((item) => state["Finished"].push(item));

      // Reset todosUpdated after setting todos
      state.todosUpdated = false;
    },
    setTodosUpdated: (state, action: PayloadAction<boolean>) => {
      state.todosUpdated = action.payload;
    },
  },
});

export const { setTodos, setTodosUpdated } = todoSlice.actions;
export default todoSlice.reducer;
