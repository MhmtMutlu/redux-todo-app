import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { addTodosAsync } from "../../redux/todos/todosSlice";
import Loading from "../Loading/Loading";

const Form: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.todos.addNewTodoLoading);
  const error = useAppSelector((state) => state.todos.addNewTodoError);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title !== "" && !/^\s+$/.test(title)) {
      await dispatch(addTodosAsync({ title }));
      setTitle("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
      {isLoading && <Loading />}
      {error && (
        <h3 style={{ color: "red", padding: "10px" }}>Error: {error}</h3>
      )}
    </>
  );
};

export default Form;
