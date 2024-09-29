import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/user'; 

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data.data;
    } catch (error) {
        console.error('Error creating task:', error.response?.data || error.message);
        throw error;
    }
};

export const loginApi = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data.data;
    } catch (error) {
        console.error('Error creating task:', error.response?.data || error.message);
        throw error;
    }
};