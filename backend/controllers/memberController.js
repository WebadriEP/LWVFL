const Member = require('../models/memberModel')
const mongoose = require('mongoose')

//Find all Members
const getMembers = async (req, res) => {
    const members = await Member.find({}).sort({createdAt: -1})
    res.status(200).json(members)
}

//Find a single member.
const getMember = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such member'})
    }

    const member = await Member.findById(id)

    if (!member) {
        return res.status(400).json({error: 'No such member'})
    }

    res.status(200).json(member)
}

const createMember = async (req, res) => {
    const { firstName, lastName, email, phone } = req.body

    let emptyFields = []

    if (!firstName) {
        emptyFields.push('firstName')
    }
    if (!lastName) {
        emptyFields.push('lastName')
    }
    if (!email) {
        emptyFields.push('email')
    }
    if (!phone) {
        emptyFields.push('phone')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({error: `The following fields are required: ${emptyFields}`})
    }

    try {
        const member = await Member.create({ firstName, lastName, email, phone })
        res.status(201).json(member)
    } catch (error) {
        res.status(400).json({error: error.message })
    }

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such member'})
    }

    const member = await Member.findById(id)

    if (!member) {
        return res.status(404).json({error: 'No such member'})
    }

    res.status(200).json(member)

}

const updateMember = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such member'})
    }

    const member = await Member.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!member) {
        return res.status(400).json({error: 'no such member'})
    }
    res.status(200).json(member)
}

const deleteMember = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such member'})
    }
  
    const member = await Member.findOneAndDelete({_id: id})
  
    if(!member) {
      return res.status(400).json({error: 'No such member'})
    }
  
    res.status(200).json(member)
  }

module.exports = {
    getMembers,
    getMember,
    createMember,
    updateMember,
    deleteMember
}