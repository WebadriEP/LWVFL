import axios from "axios"

// Make life easier by creating a base URL
export const api = axios.create(
//   {
//   baseURL: "https://dontra-production.up.railway.app/api",
// }
)

// Get all members currently stored in the DB
export const getAllMembers = async () => {
  const response = await api.get(process.env.REACT_APP_BACKEND_URL+"/api/members")
  return response.data
}

// Get a single member by ID
export const getSingleMember = async (id) => {
  const response = await api.get(process.env.REACT_APP_BACKEND_URL+"/api/members/" + id)
  return response.data
}

// Create a member
export const createMember = async (member) => {
  const response = await api.post(process.env.REACT_APP_BACKEND_URL+"/api/members", member)
  return response.data
}

// Update a member
export const updateMember = async (id, member) => {
  // patch member
  const response = await api.patch(process.env.REACT_APP_BACKEND_URL+"/api/members/" + id, member)
  return response.data
}

// import memebers
export const importMembers = async (file) => {
  const response = await api.post(process.env.REACT_APP_BACKEND_URL+"/api/members/import", file)
  return response.data
}

// Get all donations of a member by ID
export const getMemberDonations = async (id) => {
  const response = await api.get(process.env.REACT_APP_BACKEND_URL+"/api/donations/list/" + id)
  return response.data
}

// Create donation
export const createDonation = async (id, donation) => {
  const response = await api.post(process.env.REACT_APP_BACKEND_URL+"/api/donations/" + id, donation)
  return response.data
}

// Delete donation
export const deleteDonation = async (id) => {
  try {
    const res = await axios.delete(process.env.REACT_APP_BACKEND_URL+`/api/donations/` + id);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
