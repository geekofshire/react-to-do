// form.jsx
import React, { useState } from "react";

export default function TaskForm({ onAddTask }) {
  const [taskText, setTaskText] = useState("");

  const handleInputChange = (event) => {
    setTaskText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskText.trim() === "") {
      // Prevent adding empty task
      return;
    }
    onAddTask(taskText);
    setTaskText(""); // Clear input field after adding task
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        className="form-input"
        type="text"
        value={taskText}
        onChange={handleInputChange}
        placeholder="Add your Tasks here..."
      />
      <button type="submit">+</button>
    </form>
  );
}
