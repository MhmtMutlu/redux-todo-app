import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
  },
  reducers: {},
});

export default todosSlice.reducer;