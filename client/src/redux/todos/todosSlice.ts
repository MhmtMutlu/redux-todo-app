import {
  createSlice,
  PayloadAction,
  nanoid,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { Id, Items, StateType, TodosState } from "../../types/types";

const initialState = {
  items: [],
  error: null,
  activeFilter: "all",
  isLoading: false
} as TodosState

export const getTodosAsync = createAsyncThunk("todos/getTodosAsync/", async () => {
  const res = await fetch("http://localhost:7000/todos");
  return await (res.json());
});

export const todosSlice = createSlice({
  name: "todos",
  initialState,
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
            title,
          },
        };
      },
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
  extraReducers: (builder) => {
    builder.addCase(getTodosAsync.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getTodosAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = action.payload
    })
    builder.addCase(getTodosAsync.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
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
export const { addToDo, toggle, destroy, changeActiveFilter, clearCompleted } =
  todosSlice.actions;
export default todosSlice.reducer;
