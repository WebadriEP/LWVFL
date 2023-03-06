import axios from "axios"
import { useAuthContext } from "../hooks/useAuthContext"
// Make life easier by creating a base URL
export const api = axios.create({
  baseURL: process.env.BACKEND_URL+"/api",
  headers: {
    Authorization: `Bearer $(localStorage.getItem("user"))`
  }
})

// Get all members currently stored in the DB
export const getAllMembers = async () => {
  const response = await api.get(`/members`)
  return response.data
}

// Get a single member by ID
export const getSingleMember = async (id) => {
  const response = await api.get("/members/" + id)
  return response.data
}

// Create a member
export const createMember = async (member) => {
  const response = await api.post("/members", member)
  return response.data
}

// Update a member
export const updateMember = async (id, member) => {
  // patch member
  const response = await api.patch("/members/" + id, member)
  return response.data
}

export const getUsers = async () => {
  const response = await api.get('/get/users')
  return response.data;
}

export const registerUser = async (user) => {
  const response = await api.post('/users/register', user);
  return response.data;
}
export const loginUser = async (user) => {
  const {dispatch} = useAuthContext()

  const response = await  api.post('/users/login', user)
  response.headers({Authorization: 'Bearer $(User.token)'})

  localStorage.setItem('user', JSON.stringify(json))
  dispatch({type: 'LOGIN', payload:response.json})
  
  return response.data;
}