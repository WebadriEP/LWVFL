const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" })
}

// Get all users
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 })
  res.status(200).json(users)
}

// Get user by ID
const getUser = async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" })
  }

  if (!user) {
    return res.status(400).json({ error: "No such user" })
  }

  res.status(200).json(user)
}

// User LOGIN
const loginUser = async (req, res) => {
  const { email, password } = req.body // get email and password from request body

  try {
    const user = await User.login(email, password) // User.login is a static method
    const token = createToken(user._id)
    res.status(200).json({ email, token }) // send token back to client
  } catch (error) {
    res.status(401).json({ error: error.message }) // send error message back to client
  }
}

// User REGISTER
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, address, city, phone, admin } =
    req.body // get email and password from request body
  try {
    const user = await User.register(
      firstName,
      lastName,
      email,
      password,
      address,
      city,
      phone,
      admin
    ) // User.create is a static method
    const token = createToken(user._id) // create a token
    res.status(200).json({ email, token }) // send token back to client
  } catch (error) {
    res.status(500).json({ error: error.message }) // send error message back to client
  }
}

// Update user by ID
const updateUsers = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" })
  }

  // if (!validator.isEmail(email)) {
  //   throw Error('Email is invalid')
  // }
  // const exists = await this.findOne({ email })
  // if (exists && exists != req.body.email) {
  //   throw Error('Email already exists')
  // }

  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  )

  if (!user) {
    return res.status(400).json({ error: "no such member" })
  }

  res.status(200).json(user)
}

// Delete user by ID
const deleteUsers = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such user" })
  }

  const user = await User.findOneAndDelete({ _id: id })

  if (!user) {
    return res.status(400).json({ error: "No such user" })
  }

  res.status(200).json(user)
}

// Update user password by ID
const updateUserPassword = async (req, res) => {
  const { id } = req.params
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such user" })
  }
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(req.body.password, salt)
  req.body.password = hash
  try {
    const user = await User.findOneAndUpdate({ _id: id }, 
      {
        ...req.body,
      })

    

    
    res.status(200).json(user)
  } catch {
    res.status(400).json({ error: "Error" })
  }
}
module.exports = {
  loginUser,
  registerUser,
  getUsers,
  deleteUsers,
  updateUsers,
  getUser,
  updateUserPassword,
}
