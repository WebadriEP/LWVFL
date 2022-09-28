const Members = require('../models/memberModel')

//Find all Members
const getMembers = async (req, res) => {
    const members = await Members.find({}).sort({createdAt: -1})

    res.status(200).json(members)
}

//Find a single member. Currently has same code as getting all Members, will change with MongoDB integration
const getMember = async (req, res) => {
    const members = await Members.find({}).sort({createdAt: -1})

    res.status(200).json(members)
}

module.exports = {
    getMembers,
    getMember

}