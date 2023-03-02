import axios from "axios"

// Make life easier by creating a base URL
export const api = axios.create({
  baseURL: "https://lwvfl-api.up.railway.app/api",
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
