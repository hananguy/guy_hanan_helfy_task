import tasks from '../data/tasks.js';

export const GetAllTasks = () =>
{
    return tasks;
}

export const AddNewTask = (task) =>
{
    const newTask = {id: tasks.length + 1, ...task, createdAt: new Date().toISOString()};
    tasks.push(newTask);

    return newTask;
}

export const UpdateTask = (id, newData) =>
{
    const index = tasks.findIndex(task => task.id === Number(id));

    if (index === -1) {
        return null; 
    }

    tasks[index] = { 
        ...tasks[index], 
        ...newData 
    };

    return tasks[index];
}

export const DeleteTask = (id) =>
{
    const index = tasks.findIndex(task => task.id === Number(id));
    
    if(index !== -1)
    { 
        tasks.splice(index, 1);
        return true;
    }
    else
    {
        return false;
    }
}

export const ToggleTask = (id) => {
    const task = tasks.find(task => task.id === Number(id));

    if (task) {
      task.completed = !task.completed; // החלפה
      return task;
    }

    return null;
  };

  export default {GetAllTasks, AddNewTask, UpdateTask, DeleteTask, ToggleTask}