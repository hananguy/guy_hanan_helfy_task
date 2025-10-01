import './EditTask.css';
import React, { useContext, useState, useEffect } from "react";
import { updateTask } from "../services/server.js";
import TaskContext from "../../contexts/TaskContext.js";

function EditTask({ task, onClose }) {
  const { setTasks } = useContext(TaskContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false,
    priority: 'medium'
  });
  const [loading, setLoading] = useState(false);

  // Pre-fill form with existing task data
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        completed: task.completed || false,
        priority: task.priority || 'medium'
      });
    }
  }, [task]);

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
      const updatedTask = await updateTask(task.id, formData);
      setTasks(prev => 
        prev.map(t => t.id === task.id ? updatedTask : t)
      );
      if (onClose) onClose();
    } catch (error) {
      alert('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  if (!task) return null;

  return (
    <div className="edit-task-overlay">
      <div className="edit-task-box">
        <div className="edit-task-header">
          <h2>Edit Task</h2>
          {onClose && (
            <button className="close-btn" onClick={onClose}>×</button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="edit-task-form">
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
              {loading ? 'Updating...' : 'Update Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTask;
