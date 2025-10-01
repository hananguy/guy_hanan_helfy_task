import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Task from './Task.jsx';
import EditTask from './EditTask.jsx';
import TaskContext from '../../contexts/TaskContext.js';
import { deleteTask, toggleTask } from '../services/server.js';
import './Tasks.css';

function Tasks({ speed = 80 }) { // speed in px/sec
  const { tasks, setTasks } = useContext(TaskContext);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const lastTsRef = useRef(0);
  const cycleWidthRef = useRef(0);
  const rafRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      } catch (error) {
        alert('Failed to delete task');
      }
    }
  };

  const handleToggle = async (taskId) => {
    try {
      await toggleTask(taskId);
      // Update local state after successful API call
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      alert('Failed to toggle task');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const looped = useMemo(() => {
    if (!tasks || tasks.length === 0) return [];
    return [...tasks, ...tasks]; // duplicate once for seamless loop
  }, [tasks]);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const total = trackRef.current.scrollWidth;
      cycleWidthRef.current = total / 2; // because we duplicated
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('resize', measure);
      ro.disconnect();
    };
  }, [looped.length]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const step = (ts) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (!paused && cycleWidthRef.current > 0) {
        offsetRef.current -= speed * dt;
        if (-offsetRef.current >= cycleWidthRef.current) {
          offsetRef.current += cycleWidthRef.current;
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed, paused]);

  if (!tasks || tasks.length === 0) {
    return <div className="tasks-empty">No tasks yet.</div>;
  }

  return (
    <div
      className="carousel"
      ref={containerRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="carousel-track" ref={trackRef}>
        {looped.map((task, idx) => (
          <div className="carousel-item" key={`${task.id}-${idx}`}>
            <Task 
              task={task} 
              onDelete={handleDelete}
              onToggle={handleToggle}
              onEdit={handleEdit}
            />
          </div>
        ))}
      </div>
      {editingTask && (
        <EditTask 
          task={editingTask} 
          onClose={() => setEditingTask(null)} 
        />
      )}
    </div>
  );
}

export default Tasks;
