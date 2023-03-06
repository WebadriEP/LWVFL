import axios from "axios"

// Make life easier by creating a base URL
export const api = axios.create(
//   {
//   baseURL: "https://dontra-production.up.railway.app/api",
// }
)

// Get all members currently stored in the DB
export const getAllMembers = async () => {
  const response = await api.get("https://dontra-production.up.railway.app/api/members")
  return response.data
}

// Get a single member by ID
export const getSingleMember = async (id) => {
  const response = await api.get("https://dontra-production.up.railway.app/api/members/" + id)
  return response.data
}

// Create a member
export const createMember = async (member) => {
  const response = await api.post("https://dontra-production.up.railway.app/api/members", member)
  return response.data
}

// Update a member
export const updateMember = async (id, member) => {
  // patch member
  const response = await api.patch("https://dontra-production.up.railway.app/api/members/" + id, member)
  return response.data
}

// import memebers
export const importMembers = async (file) => {
  const response = await api.post("https://dontra-production.up.railway.app/api/members/import", file)
  return response.data
}

// Get all donations of a member by ID
export const getMemberDonations = async (id) => {
  const response = await api.get("https://dontra-production.up.railway.app/api/donations/list/" + id)
  return response.data
}

// Create donation
export const createDonation = async (id, donation) => {
  const response = await api.post("https://dontra-production.up.railway.app/api/donations/" + id, donation)
  return response.data
}
