import { createAsyncThunk } from "@reduxjs/toolkit";
import { Data } from "../../types/types";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync/",
  async () => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_ENDPOINT}`);
    return res.json();
  }
);

export const addTodosAsync = createAsyncThunk(
  "todos/addTodosAsync/",
  async (todo: Data) => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    return res.json();
  }
);

export const toggleTodosAsync = createAsyncThunk(
  "todos/toggleTodosAsync/",
  async ({ id, completed }: Data) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }),
      }
    );
    return res.json();
  }
);

export const deleteTodosAsync = createAsyncThunk(
  "todos/deleteTodosAsync/",
  async (id: string) => {
    await fetch(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/${id}`,
      { method: "DELETE" }
    );
    return id;
  }
);