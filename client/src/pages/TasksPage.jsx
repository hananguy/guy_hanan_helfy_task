import React, { useState, useEffect } from "react";
import Tasks from "../components/Tasks.jsx";
import NewTask from "../components/NewTask.jsx";
import { fetchTasks } from "../services/server.js";
import TaskContext from "../../contexts/TaskContext.js";
import "./TasksPage.css";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [showNewTask, setShowNewTask] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        setError("Failed to load tasks");
      } 
    };
    getTasks();
  }, []);

  return (
    <div>
        <TaskContext.Provider value={{tasks, setTasks}}>
            <div className="tasks-page-header">
              <h1>Task Manager</h1>
              <button 
                className="add-task-btn"
                onClick={() => setShowNewTask(true)}
              >
                + Add New Task
              </button>
            </div>
            <Tasks />
            {showNewTask && (
              <NewTask onClose={() => setShowNewTask(false)} />
            )}
        </TaskContext.Provider>
    </div>
  );
}

export default TasksPage;
