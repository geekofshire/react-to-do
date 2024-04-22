// TodoItem.jsx
import React, { useState } from "react";

export default function TodoItem({ task, onDelete, onEdit, onToggle }) {
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    onEdit(editedText);
    setEditMode(false);
  };

  return (
    <div className="todo-list">
      {editMode ? (
        <div className="todo-item">
          <input
            className="todo-item-input"
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleSave} type="button">
            Save
          </button>
        </div>
      ) : (
        <div className="todo-item">
          <span
            className="todo-item-text"
            style={{ textDecoration: task.done ? "line-through" : "none" }}
          >
            {task.text}
          </span>
          <div className="todo-item-buttons">
            <button onClick={handleEdit} type="button">
              Edit
            </button>
            <button onClick={onDelete} type="button">
              Delete
            </button>
            <button onClick={onToggle} type="button">
              {task.done ? "Undo" : "Done"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
