const User = require('../models/userModel')
const jwt = require('jsonwebtoken');

// const createToken = (_id) => {
//   return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' })
// }

// user login
const loginUser = async (req, res) => {
  const { email, password } = req.body; // get email and password from request body

  try {
    const user = await User.login(email, password) 
   // const token = createToken(user._id) // create a token
    res.status(200).json({ email}) // send token back to client
  } 
  catch (error) {
    res.status(401).json({ error: error.message }) // send error message back to client
  }
}

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body; // get email and password from request body
  try {
    const user = await User.register(firstName, lastName, email, password) // User.create is a static method
   // const token = createToken(user._id) // create a token
    res.status(200).json({ email }) // send token back to client
  }
  catch (error) {
    res.status(500).json({ error: error.message }) // send error message back to client
  }
}

module.exports = { loginUser, registerUser }