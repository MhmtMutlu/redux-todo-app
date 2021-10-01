import React from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { toggle, destroy } from "../../redux/todos/todosSlice";

type ToDoItem = {
  id: string;
  title: string;
  completed: boolean;
};

let filtered: Array<ToDoItem> = [];

const ToDoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.todos.items);
  const activeFilter = useAppSelector((state) => state.todos.activeFilter);

  if (activeFilter !== "all") {
    filtered = items.filter((todo) =>
      activeFilter === "active"
        ? todo.completed === false
        : todo.completed === true
    );
  } else {
    filtered = items;
  }

  return (
    <ul className="todo-list">
      {filtered.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.completed}
              onChange={() => dispatch(toggle({ id: item.id }))}
            />
            <label>{item.title}</label>
            <button
              className="destroy"
              onClick={() => dispatch(destroy({ id: item.id }))}
            ></button>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default ToDoList;
