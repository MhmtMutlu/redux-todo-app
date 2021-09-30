import React from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { toggle } from "../../redux/todos/todosSlice";

const ToDoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.todos.items);

  return (
    <ul className="todo-list">
      {items.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.completed}
              onChange={() => dispatch(toggle({ id: item.id }))}
            />
            <label>{item.title}</label>
            <button className="destroy"></button>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default ToDoList;
