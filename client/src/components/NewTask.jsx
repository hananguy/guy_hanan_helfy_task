import './NewTask.css';
import React, { useContext, useState } from "react";
import { createTask } from "../services/server.js";
import TaskContext from "../../contexts/TaskContext.js";

function NewTask({ onClose }) {
  const { setTasks } = useContext(TaskContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false,
    priority: 'medium'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }

    setLoading(true);
    try {
      const newTask = await createTask(formData);
      setTasks(prev => [...prev, newTask]);
      setFormData({ title: '', description: '', completed: false, priority: 'medium' });
      if (onClose) onClose();
    } catch (error) {
      alert('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-task-overlay">
      <div className="new-task-box">
        <div className="new-task-header">
          <h2>Add New Task</h2>
          {onClose && (
            <button className="close-btn" onClick={onClose}>×</button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="new-task-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="completed"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
            />
            <label htmlFor="completed">Mark as completed</label>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTask;
