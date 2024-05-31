import React, { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({ setTasks }) => {
	const [taskData, setTaskData] = useState({
		task: "",
		description: "",
		status: "todo",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setTaskData((prev) => {
			return { ...prev, [name]: value };
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(taskData);
		setTasks((prev) => {
			return [...prev, taskData];
		});
		setTaskData({
			task: "",
			description: "",
			status: "todo",
		});
	};

	return (
		<header className="app_header">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="task"
					value={taskData.task}
					className="task_input"
					placeholder="Enter your task"
					onChange={handleChange}
				/>
				<textarea
					name="description"
					value={taskData.description}
					className="task_description"
					placeholder="Enter task description"
					onChange={handleChange}
				/>
				<div className="task_form_bottom_line">
					<select
						name="status"
						value={taskData.status}
						className="task_status"
						onChange={handleChange}>
						<option value="todo">Pending</option>
						<option value="doing">In Progress</option>
						<option value="done">Completed</option>
					</select>
					<button type="submit" className="task_submit">
						+ Add Task
					</button>
				</div>
			</form>
		</header>
	);
};

export default TaskForm;
