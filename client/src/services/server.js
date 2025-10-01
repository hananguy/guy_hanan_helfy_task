import axios from 'axios';

// Axios instance for backend API
export const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

async function fetchTasks() {
    const response = await api.get("/tasks");
    return response.data;
}

async function createTask(taskData) {
    const response = await api.post("/tasks", taskData);
    return response.data;
}

async function updateTask(id, taskData) {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
}

async function deleteTask(id) {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
}

async function toggleTask(id) {
    const response = await api.patch(`/tasks/${id}/toggle`);
    return response.data;
}

export { fetchTasks, createTask, updateTask, deleteTask, toggleTask }

