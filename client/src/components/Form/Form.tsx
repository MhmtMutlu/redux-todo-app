import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { addTodosAsync } from "../../redux/todos/todosSlice";
import Loading from "../Loading/Loading";

const Form: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.todos.addNewTodoLoading);

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
        {
          isLoading && <Loading />
        }
      </form>
    </>
  );
};

export default Form;
