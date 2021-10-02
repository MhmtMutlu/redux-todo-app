import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { Id, Items, StateType } from "../../types/types";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [
      {
        id: "1",
        title: "Learn React",
        completed: true,
      },
      {
        id: "2",
        title: "Read Book",
        completed: false,
      },
    ],
    activeFilter: "all",
  },
  reducers: {
    addToDo: {
      reducer: (state, action: PayloadAction<Items>) => {
        state.items.push(action.payload);
      },
      prepare: ({ title }) => {
        return {
          payload: {
            id: nanoid(),
            completed: false,
            title
          }
        }
      }
    },
    toggle: (state, action: PayloadAction<Id>) => {
      const { id } = action.payload;
      const item = state.items.find((obj) => obj.id === id);

      item && (item.completed = !item?.completed);
    },
    destroy: (state, action: PayloadAction<Id>) => {
      const { id } = action.payload;
      const filtered = state.items.filter((item) => item.id !== id);

      state.items = filtered;
    },
    changeActiveFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      const filtered = state.items.filter((item) => item.completed === false);
      state.items = filtered;
    },
  },
});

export const selectTodos = (state: StateType) => state.todos.items;
export const selectActiveFilter = (state: StateType) => state.todos.activeFilter;
export const selectFilteredTodos = (state: StateType) => {
  if (state.todos.activeFilter === "all") {
    return state.todos.items;
  }
  return state.todos.items.filter((todo) =>
    state.todos.activeFilter === "active"
      ? todo.completed === false
      : todo.completed === true
  );
};
export const { addToDo, toggle, destroy, changeActiveFilter, clearCompleted } =
  todosSlice.actions;
export default todosSlice.reducer;
