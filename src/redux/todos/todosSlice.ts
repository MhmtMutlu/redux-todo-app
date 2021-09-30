import { createSlice, PayloadAction  } from "@reduxjs/toolkit";

type Items = {
  id: string;
  title: string;
  completed: boolean;
}

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
      }
    ],
  },
  reducers: {
    addToDo: (state, action: PayloadAction<Items>) => {
      state.items.push(action.payload)
    }
  },
});

export const { addToDo } = todosSlice.actions
export default todosSlice.reducer;