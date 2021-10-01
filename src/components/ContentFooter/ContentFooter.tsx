import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { changeActiveFilter } from "../../redux/todos/todosSlice";

const ContentFooter: React.FC = () => {
  const items = useAppSelector((state) => state.todos.items);
  const activeFilter = useAppSelector((state) => state.todos.activeFilter);
	const dispatch = useAppDispatch();

  const itemsLeft = items.filter((item) => !item.completed);

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft.length}</strong> item{itemsLeft.length > 1 && "s"}{" "}
        left
      </span>

      <ul className="filters">
        <li>
          <a
            href="/#"
            className={activeFilter === "all" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("all"))}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="/#"
            className={activeFilter === "active" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("active"))}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="/#"
            className={activeFilter === "completed" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("completed"))}
          >
            Completed
          </a>
        </li>
      </ul>
      <button className="clear-completed">Clear completed</button>
    </footer>
  );
};

export default ContentFooter;
