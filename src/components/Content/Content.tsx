import React from 'react'
import ToDoList from '../ToDoList/ToDoList'

const Content: React.FC = () => {
  return (
    <section className="main">
		<input className="toggle-all" type="checkbox" />
		<label htmlFor="toggle-all">
			Mark all as complete
		</label>

		<ToDoList />
	</section>
  )
}

export default Content
