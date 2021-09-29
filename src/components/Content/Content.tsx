import React from 'react'
import ContentFooter from '../ContentFooter/ContentFooter'
import ToDoList from '../ToDoList/ToDoList'

const Content: React.FC = () => {
  return (
		<>
			<section className="main">
				<input className="toggle-all" type="checkbox" />
				<label htmlFor="toggle-all">
					Mark all as complete
				</label>
				<ToDoList />
			</section>
			<ContentFooter />
		</>
  )
}

export default Content
