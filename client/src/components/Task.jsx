import React from 'react';
import './Task.css';

function Task({ task, onToggle = () => {}, onDelete = () => {}, onEdit = () => {} }) {
  if (!task) return null;

  const priorityClass =
    task.priority === 'high'
      ? 'priority-high'
      : task.priority === 'medium'
      ? 'priority-medium'
      : 'priority-low';

  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      <div className="task-left">
        <button
          className="task-toggle"
          onClick={() => onToggle(task.id)}
          title={task.completed ? 'Mark as pending' : 'Mark as completed'}
        />

        <div className="task-texts">
          <div className="task-title">{task.title}</div>
          {task.description ? <div className="task-desc">{task.description}</div> : null}
        </div>
      </div>

      <div className="task-actions">
        <span className={`priority-badge ${priorityClass}`}>{task.priority}</span>
        <button className="btn btn-edit" onClick={() => onEdit(task)}>Edit</button>
        <button className="btn btn-delete" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}

export default Task;
