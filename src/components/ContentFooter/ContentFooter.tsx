import React from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';

const ContentFooter: React.FC = () => {
	const items = useAppSelector((state) => state.todos.items);
	const itemsLeft = items.filter(item => !item.completed);

  return (
    <footer className="footer">
		<span className="todo-count">
			<strong>{itemsLeft.length}</strong> item{itemsLeft.length > 1 && "s"} left
		</span>

		<ul className="filters">
			<li>
				<a href="/#" className="selected">All</a>
			</li>
			<li>
				<a href="/#" >Active</a>
			</li>
			<li>
				<a href="/#" >Completed</a>
			</li>
		</ul>
		<button className="clear-completed">
			Clear completed
		</button>
	</footer>
  )
}

export default ContentFooter;
