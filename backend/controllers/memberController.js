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

const updateMember = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such member'})
    }

    const members = await Members.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!members) {
        return res.status(400).json({error: 'no such member'})
    }
    res.status(200).json(member)
}

module.exports = {
    getMembers,
    getMember,
    updateMember


}