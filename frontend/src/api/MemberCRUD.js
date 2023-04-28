import axios from "axios"

const addMemberFuntion = async (
  firstName,
  lastName,
  email,
  phone,
  homeAddress,
  city,
  state,
  zip
) => {
  try {
    //const res = await axios.post('https://dontra-production.up.railway.app/api/members', {
    const res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/api/members",
      {
        firstName,
        lastName,
        email,
        phone,
        homeAddress,
        city,
        state,
        zip,
      }
    )
    return res.data
  } catch (err) {
    console.error(err)
  }
}
export { addMemberFuntion }

const deleteMemberFunction = async (id) => {
  try {
    const res = await axios.delete(
      process.env.REACT_APP_BACKEND_URL + `/api/members/${id}`
    )
    return res.data
  } catch (err) {
    console.error(err)
  }
}
export { deleteMemberFunction }
