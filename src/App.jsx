import React, { useState, useEffect } from "react";

import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";

// Retrieve tasks from local storage
const oldTasks = localStorage.getItem("tasks");

const App = () => {
	// Initialize state variables
	const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []); // Tasks state with default value from local storage
	const [activeCard, setActiveCard] = useState(null); // Active card state

	// Effect to update local storage when tasks change
	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks)); // Update local storage with tasks data
	}, [tasks]);

	// Function to handle task deletion
	const handleDelete = (taskIndex) => {
		const newTasks = tasks.filter((task, index) => index !== taskIndex); // Filter out the deleted task
		setTasks(newTasks); // Update tasks state
	};

	// Function to handle task movement between columns
	const handleMove = (index, newStatus) => {
		const updatedTasks = tasks.map((task, i) => {
			if (i === index) {
				return {
					...task,
					status: newStatus,
					timestamp: newStatus === "done" ? new Date() : null, // Set timestamp if task is marked as done
				};
			}
			return task;
		});
		setTasks(updatedTasks); // Update tasks state with moved task
	};

	// Function to handle task drop within a column
	const onDrop = (status, position) => {
		if (activeCard == null || activeCard === undefined) return;

		const taskToMove = tasks[activeCard];
		const updatedTask = tasks.filter((task, index) => index !== activeCard);

		updatedTask.splice(position, 0, {
			...taskToMove,
			status: status,
		});
		setTasks(updatedTask);
	};

	return (
		<div className="app">
			{/* TaskForm component for adding new tasks */}
			<TaskForm setTasks={setTasks} />

			{/* Main section with task columns */}
			<main className="app_main">
				{/* Pending column */}
				<TaskColumn
					title="Pending"
					icon={todoIcon}
					tasks={tasks}
					status="todo"
					handleMove={handleMove}
					handleDelete={handleDelete}
					setActiveCard={setActiveCard}
					onDrop={onDrop}
				/>

				{/* In Progress column */}
				<TaskColumn
					title="In Progress"
					icon={doingIcon}
					tasks={tasks}
					status="doing"
					handleMove={handleMove}
					handleDelete={handleDelete}
					setActiveCard={setActiveCard}
					onDrop={onDrop}
				/>

				{/* Completed column */}
				<TaskColumn
					title="Completed"
					icon={doneIcon}
					tasks={tasks}
					status="done"
					handleDelete={handleDelete}
					setActiveCard={setActiveCard}
					onDrop={onDrop}
				/>
			</main>
		</div>
	);
};

export default App;
