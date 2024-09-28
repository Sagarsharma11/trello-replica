import axiosInstance from './axiosInstance';  

export const createTask = async (taskData) => {
  try {
    const response = await axiosInstance.post('/', taskData);
    return response.data.data;
  } catch (error) {
    console.error('Error creating task:', error.response?.data || error.message);
    throw error;
  }
};

export const getAllTask = async () => {
  try {
    const response = await axiosInstance.get('/');
    // console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching tasks:', error.response?.data || error.message);
    throw error;
  }
};

export const editTask = async (updatedValue, _id) => {
  try {
    const response = await axiosInstance.put(`/${_id}`, updatedValue);
    // console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error updating task:', error.response?.data || error.message);
    throw error;
  }
};


export const deleteTask = async ( _id) => {
  try {
    const response = await axiosInstance.delete(`/${_id}`);
    // console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error updating task:', error.response?.data || error.message);
    throw error;
  }
};
