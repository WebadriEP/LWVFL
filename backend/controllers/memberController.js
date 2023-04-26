const Member = require("../models/memberModel")
const mongoose = require("mongoose")
mongoose.set("toJSON", { virtuals: true })

// Find all Members
const getMembers = async (req, res) => {
  const members = await Member.find({}).sort({ createdAt: -1 })
  res.status(200).json(members)
}

// Get total members
const getStatTotalMembers = async (req, res) => {
  try {
    const members = await Member.find({}).sort({ createdAt: -1 })
    res.status(200).json(members.length)
  } catch (error) {
    res.status(500).json(error)
  }
}

// Get total donations
const getStatTotalDonations = async (req, res) => {
  const members = await Member.find({}).sort({ createdAt: -1 })
  let totalDonations = 0
  members.forEach((member) => {
    totalDonations += member.donations.length
  })
  res.status(200).json(totalDonations)
}

// Get total donations amount
const getStatTotalDonationsAmount = async (req, res) => {
  const members = await Member.find({}).sort({ createdAt: -1 })
  let totalDonationsAmount = 0
  members.forEach((member) => {
    member.donations.forEach((donation) => {
      totalDonationsAmount += donation.donationAmount
    })
  })
  res.status(200).json(totalDonationsAmount)
}

// Find a single member
const getMember = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such member" })
  }

  const member = await Member.findById(id)

  if (!member) {
    return res.status(400).json({ error: "No such member" })
  }

  res.status(200).json(member)
}

// Create a member
const createMember = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    homeAddress,
    addressLine2,
    city,
    state,
    zip,
    gender,
    birthMonth,
    birthDay,
    birthYear,
    memberNotes,
    memberType,
    isStudent,
    memberActiveStatus,
    memberStatus,
  } = req.body

  let emptyFields = []

  // Check if required fields are empty
  if (!firstName) {
    emptyFields.push("firstName")
  }
  if (!lastName) {
    emptyFields.push("lastName")
  }
  if (!email) {
    emptyFields.push("email")
  }
  if (!phone) {
    emptyFields.push("phone")
  }
  if (!homeAddress) {
    emptyFields.push("homeAddress")
  }
  if (!city) {
    emptyFields.push("city")
  }
  if (!state) {
    emptyFields.push("state")
  }
  if (!zip) {
    emptyFields.push("zip")
  }
  // if (!birthMonth) {
  //     emptyFields.push('birthMonth')
  // }
  // if (!birthDay) {
  //     emptyFields.push('birthDay')
  // }
  // if (!birthYear) {
  //     emptyFields.push('birthYear')
  // }
  // if (!memberType) {
  //     emptyFields.push('memberType')
  // }
  // if (!isStudent) {
  //     emptyFields.push('isStudent')
  // }

  // If any are empty, return error
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: `The following fields are required: ${emptyFields}` })
  }

  // Attempt to create member
  try {
    const member = await Member.create({
      firstName,
      lastName,
      email,
      phone,
      homeAddress,
      addressLine2,
      city,
      state,
      zip,
      gender,
      birthMonth,
      birthDay,
      birthYear,
      memberNotes,
      memberType,
      isStudent,
      memberActiveStatus,
      memberStatus,
    })
    res.status(201).json(member)
  } catch (error) {
    // If error, return error
    res.status(400).json({ error: error.message })
  }
}

// Update a member
const updateMember = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such member" })
  }

  const member = await Member.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  )

  if (!member) {
    return res.status(400).json({ error: "no such member" })
  }
  res.status(200).json(member)
}

// Delete a member
const deleteMember = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such member" })
  }

  const member = await Member.findOneAndDelete({ _id: id })

  if (!member) {
    return res.status(400).json({ error: "No such member" })
  }

  res.status(200).json(member)
}

// Export all members
const exportMembers = async (req, res) => {
  try {
    // Get all members
    const members = await Member.find()

    // Set date for filename
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    // Send CSV as response
    res.setHeader("Content-Type", "text/csv")
    res.setHeader(
      "Content-Disposition",
      f`attachment; filename=Export-Members-${year}${month}${day}.csv`
    )
    res.status(200).send(csvString)
  } catch (error) {
    res.status(400).json({ error: error.message })
    console.error(error)
  }
}

module.exports = {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
  exportMembers,
  getStatTotalMembers,
  getStatTotalDonations,
  getStatTotalDonationsAmount,
}
