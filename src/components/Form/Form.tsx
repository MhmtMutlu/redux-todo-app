import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { addToDo } from "../../redux/todos/todosSlice";

const Form: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title !== "" && !/^\s+$/.test(title)) {
      dispatch(
        addToDo({ title })
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
