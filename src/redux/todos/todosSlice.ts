import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Items = {
  id: string;
  title: string;
  completed: boolean;
};

type Id = {
  id: string;
};

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
  },
  reducers: {
    addToDo: (state, action: PayloadAction<Items>) => {
      state.items.push(action.payload);
    },
    toggle: (state, action: PayloadAction<Id>) => {
      const { id } = action.payload;
      const item = state.items.find((obj) => obj.id === id);

      item && (item.completed = !item?.completed);
    },
  },
});

export const { addToDo, toggle } = todosSlice.actions;
export default todosSlice.reducer;
