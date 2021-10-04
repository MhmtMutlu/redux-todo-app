import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Items, StateType, TodosState } from "../../types/types";
import {deleteTodosAsync, getTodosAsync,  addTodosAsync, toggleTodosAsync } from "./services";

const initialState = {
  items: [],
  error: null,
  activeFilter: localStorage.getItem("activeFilter") || "all",
  isLoading: false,
  addNewTodoLoading: false,
  addNewTodoError: null,
} as TodosState;

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    changeActiveFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      const filtered = state.items.filter((item) => item.completed === false);
      state.items = filtered;
    },
  },
  extraReducers: (builder) => {
    // get todos
    builder.addCase(getTodosAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTodosAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    });
    builder.addCase(getTodosAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    // add todos
    builder.addCase(addTodosAsync.pending, (state) => {
      state.addNewTodoLoading = true;
    });
    builder.addCase(
      addTodosAsync.fulfilled,
      (state, action: PayloadAction<Items>) => {
        state.addNewTodoLoading = false;
        state.items.push(action.payload);
      }
    );
    builder.addCase(addTodosAsync.rejected, (state, action) => {
      state.addNewTodoLoading = false;
      state.addNewTodoError = action.error.message;
    });
    // toggle todos
    builder.addCase(
      toggleTodosAsync.fulfilled,
      (state, action: PayloadAction<Items>) => {
        const { id, completed } = action.payload;
        const index = state.items.findIndex((item) => item.id === id);
        state.items[index].completed = completed;
      }
    );
    // delete todos
    builder.addCase(
      deleteTodosAsync.fulfilled,
      (state, action: PayloadAction<string>) => {
        const id = action.payload;
        const filtered = state.items.filter((item) => item.id !== id);
        state.items = filtered;
        // const index = state.items.findIndex((item) => item.id === id);
        // state.items.splice(index, 1);
      }
    );
  },
});

export const selectTodos = (state: StateType) => state.todos.items;
export const selectActiveFilter = (state: StateType) =>
  state.todos.activeFilter;
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
export const { changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
