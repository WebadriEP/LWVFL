const Donors = require('../models/donorModel')

//Find all Members
const getDonors = async (req, res) => {
    const donors = await Donors.find({}).sort({createdAt: -1})

    res.status(200).json(donors)
}

//Find a single donor.
const getDonor = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'That donor does not exist'})
    }
    
    const donor = await Donors.findById(id)
    
    if(!donor){
        return res.status(404).json({error: 'That donor does not exist'})
    }

    res.status(200).json(donor)
}

const updateDonor = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such donor'})
    }

    const donors = await Donors.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!donors) {
        return res.status(400).json({error: 'no such donor'})
    }
    res.status(200).json(donor)
}

module.exports = {
    getDonors,
    getDonor,
    updateDonor


}