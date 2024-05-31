import React, { useState } from "react";
import "./TaskCard.css";
import deleteIcon from "../assets/delete.png";
import moment from "moment";

const TaskCard = ({
	title,
	description,
	handleDelete,
	index,
	setActiveCard,
	status,
	handleMove,
}) => {
	var now; // Declaring a variable for timestamp

	// Function to handle task completion
	const handleTaskCompletion = () => {
		now = new Date(); // Set current timestamp
		// setCompletedTime(now); // Set the completed time immediately
		console.log("time", now); // Log the timestamp
		handleMove(index, "done"); // Move task to Completed status
	};

	return (
		<article
			className="task_card"
			draggable
			onDragStart={() => setActiveCard(index)}
			onDragEnd={() => setActiveCard(null)}>
			<p className="task_text">{title}</p>
			<p className="task_description">{description}</p>
			<div className="task_card_bottom_line">
				<div className="task_actions">
					{status === "todo" && (
						<button onClick={() => handleMove(index, "doing")}>
							Move to In Progress
						</button>
					)}
					{status === "doing" && (
						<button onClick={handleTaskCompletion}>Move to Completed</button>
					)}
				</div>
				{status === "done" && (
					<p className="task_timestamp">
						{/* Display the formatted timestamp using moment */}
						{moment(now).format("DD/MM/YYYY, HH:mm")}
					</p>
				)}
				<div className="task_delete" onClick={() => handleDelete(index)}>
					<img src={deleteIcon} className="delete_icon" alt="delete" />
				</div>
			</div>
		</article>
	);
};

export default TaskCard;
