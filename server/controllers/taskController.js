import TaskModel from '../models/tasksModel.js';

export const getAllTasksController = (req,res) =>
{
  try
  {
    const result = TaskModel.GetAllTasks();
    res.status(200).json(result);
  }
  catch (err)
  {
    return res.status(500).json({ error: "Failed to fetch all tasks" });
  }
}

export const createTaskController = (req,res) =>
{
  try
  {
    const result = TaskModel.AddNewTask(req.body);
    res.status(201).json(result);
  }
  catch (err)
  {
    return res.status(500).json({ error: "Failed to create a new task" });
  } 
} 

export const updateTaskController = (req,res) =>
{
  const taskId = req.params.id;
  const updatedTask = req.body;
  if (!taskId || !updatedTask)
  {
    return res.status(400).json({ error: "Task ID and updated task are required" });
  }

  try
  {
    const result = TaskModel.UpdateTask(taskId, updatedTask);
    res.status(200).json(result);
  }
  catch (err)
  {
    return res.status(500).json({ error: "Failed to update the task" });
  }
}

export const deleteTaskController = (req,res) =>
{
  const taskId = req.params.id;
  if (!taskId)
  {
    return res.status(400).json({ error: "Task ID is required" });
  }

    const result = TaskModel.DeleteTask(taskId);

    if(result)
    {
      res.status(200).json("Successfully deleted the task");
    }
    else
    {
      return res.status(404).json({ error: "Task not found" });
    } 
}

export const toggleTaskController = (req,res) =>
{
  const taskId = req.params.id;

  if (!taskId)
  {
    return res.status(400).json({ error: "Task ID is required" });
  }
  
  const result = TaskModel.ToggleTask(taskId);
  if(result)
  {
    res.status(200).json("Successfully toggled the task");
  }
  else
  {
    return res.status(404).json({ error: "Task not found" });
  }
}

export default {getAllTasksController, createTaskController, updateTaskController, deleteTaskController, toggleTaskController}