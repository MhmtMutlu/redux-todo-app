import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  selectFilteredTodos,
  getTodosAsync,
  toggleTodosAsync,
  deleteTodosAsync,
} from "../../redux/todos/todosSlice";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";

const ToDoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const filteredTodos = useAppSelector(selectFilteredTodos);
  const isLoading = useAppSelector((state) => state.todos.isLoading);
  const error = useAppSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const handleToggle = async (id: string, completed: boolean) => {
    await dispatch(toggleTodosAsync({ id, completed }));
  };

  const handleDestroy = async (id: string) => {
    if (window.confirm("Are you sure?")) {
      await dispatch(deleteTodosAsync(id));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
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
              onChange={() => handleToggle(item.id, !item.completed)}
            />
            <label>{item.title}</label>
            <button
              className="destroy"
              onClick={() => handleDestroy(item.id)}
            ></button>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default ToDoList;
