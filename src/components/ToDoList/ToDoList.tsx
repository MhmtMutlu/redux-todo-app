import React from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';

const ToDoList: React.FC = () => {
	const items = useAppSelector(state => state.todos.items);

  return (
    <ul className="todo-list">
			{
				items.map((item) => (
					<li key={item.id}>
						<div className="view">
							<input className="toggle" type="checkbox" />
							<label>{item.title}</label>
							<button className="destroy"></button>
						</div>
					</li>
				))
			}
		</ul>
  )
}
export default ToDoList;