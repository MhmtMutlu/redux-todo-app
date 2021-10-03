import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Data, Id, Items, StateType, TodosState } from "../../types/types";

const initialState = {
  items: [],
  error: null,
  activeFilter: "all",
  isLoading: false,
  addNewTodoLoading: false,
  addNewTodoError: null
} as TodosState;

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync/",
  async () => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_ENDPOINT}`);
    return await res.json();
  }
);

export const addTodosAsync = createAsyncThunk(
  "todos/addTodosAsync/",
  async (todo: Data) => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_ENDPOINT}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    return await res.json();
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
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
    builder.addCase(addTodosAsync.fulfilled, (state, action: PayloadAction<Items>) => {
      state.addNewTodoLoading = false;
      state.items.push(action.payload);
    });
    builder.addCase(addTodosAsync.rejected, (state, action) => {
      state.addNewTodoLoading = false;
      state.addNewTodoError = action.error.message;
    });
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
export const { toggle, destroy, changeActiveFilter, clearCompleted } =
  todosSlice.actions;
export default todosSlice.reducer;
