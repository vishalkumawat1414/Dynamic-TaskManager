import React from "react";
import Todo from "../assets/direct-hit.png";

import "./TaskColumn.css";
import TaskCard from "./TaskCard";
import DropArea from "./DropArea";

const TaskColumn = ({
	title,
	icon,
	tasks,
	status,
	handleDelete,
	setActiveCard,
	handleMove,
	onDrop,
}) => {
	return (
		<section className="task_column">
			<h2 className="task_column_heading">
				<img className="task_column_icon" src={icon} alt="" /> {title}
			</h2>
			<DropArea onDrop={() => onDrop(status, 0)} />
			{tasks?.map(
				(task, index) =>
					task.status === status && (
						<>
							<TaskCard
								key={index}
								title={task.task}
								description={task.description}
								handleDelete={handleDelete}
								index={index}
								setActiveCard={setActiveCard}
								status={task.status}
								handleMove={handleMove}
							/>
							<DropArea onDrop={() => onDrop(status, index + 1)} />
						</>
					),
			)}
		</section>
	);
};

export default TaskColumn;
