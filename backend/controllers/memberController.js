const Members = require('../models/memberModel')

//Find all Members
const getMembers = async (req, res) => {
    const members = await Members.find({}).sort({createdAt: -1})

    res.status(200).json(members)
}

//Find a single member
const getMember = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'That member does not exist'})
    }
    
    const member = await Member.findById(id)
    
    if(!member){
        return res.status(404).json({error: 'That member does not exist'})
    }

    res.status(200).json(member)
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