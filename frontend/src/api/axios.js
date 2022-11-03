import axios from 'axios';

// Make life easier by creating a base URL
export const api = axios.create({
    baseURL: '/api'
})

// Get all members currently stored in the DB
export const getAllMembers = async () => {
  const response = await api.get(`/members`);
  return response.data;
}

// Get a single member by ID
export const getMember = async (id) => {
  const response = await api.get(`/members/${id}`);
  return response.data;
}