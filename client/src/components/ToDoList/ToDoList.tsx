import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { toggle, destroy } from "../../redux/todos/todosSlice";
import { selectFilteredTodos }from "../../redux/todos/todosSlice";


const ToDoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const filteredTodos = useAppSelector(selectFilteredTodos)

  return (
    <ul className="todo-list">
      {filteredTodos.map((item) => (
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
