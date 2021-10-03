import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { toggle, destroy } from "../../redux/todos/todosSlice";
import {
  selectFilteredTodos,
  getTodosAsync,
} from "../../redux/todos/todosSlice";
import Loading from "../Loading/Loading";

const ToDoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const filteredTodos = useAppSelector(selectFilteredTodos);
  const isLoading = useAppSelector((state) => state.todos.isLoading);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  if(isLoading) {
    return <Loading />
  }

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
