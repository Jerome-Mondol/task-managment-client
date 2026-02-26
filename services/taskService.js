import api from './api';

// Get all tasks with pagination, filtering, and search
export const getTasks = async (page = 1, limit = 10, status = 'all', search = '') => {
  const params = new URLSearchParams({
    page,
    limit,
    ...(status !== 'all' && { status }),
    ...(search && { search })
  });
  
  const response = await api.get(`/tasks?${params}`);
  return response;
};

// Create a new task
export const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response;
};

// Update a task
export const updateTask = async (taskId, taskData) => {
  const response = await api.put(`/tasks/${taskId}`, taskData);
  return response;
};

// Delete a task
export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response;
};
