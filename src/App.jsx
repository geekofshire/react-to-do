import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "./TodoItem";
import TaskForm from "./Form";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  // Load tasks from local storage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Store tasks in local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskText) => {
    if (!taskText) return;
    const newTask = {
      id: uuidv4(),
      text: taskText,
      done: false,
    };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const editTask = (taskId, newText) => {
    if (!newText) return;
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task,
      ),
    );
  };

  const toggleDone = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") {
      return task.done;
    }
    if (filter === "Uncompleted") {
      return !task.done;
    }
    return true;
  });

  return (
    <div>
      <h1 className="title">Your Task Lists</h1>
      <div className="container">
        <div className="controls">
          <TaskForm onAddTask={addTask} />
          <div className="filter-container">
            <label htmlFor="filter">Filter: </label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Uncompleted">Uncompleted</option>
            </select>
          </div>
        </div>

        <ol>
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <TodoItem
                task={task}
                onDelete={() => removeTask(task.id)}
                onEdit={(newText) => editTask(task.id, newText)}
                onToggle={() => toggleDone(task.id)}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
