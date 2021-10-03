import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { addTodosAsync } from "../../redux/todos/todosSlice";

const Form: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title !== "" && !/^\s+$/.test(title)) {
      await dispatch(
        addTodosAsync({ title })
      );
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
};

export default Form;
