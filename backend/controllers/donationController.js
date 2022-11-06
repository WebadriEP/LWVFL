const Donations = require('../models/donationModel')

//Find all donations
const getDonations = async (req, res) => {
    const donations = await Donations.find({}).sort({createdAt: -1})

    res.status(200).json(donations)
}

//Find a single donation.
const getDonation = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'That donation does not exist'})
    }
    
    const donation = await Donations.findById(id)
    
    if(!donation){
        return res.status(404).json({error: 'That donation does not exist'})
    }

    res.status(200).json(donation)
}

const updateDonation = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such donation'})
    }

    const donation = await Donations.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!donation) {
        return res.status(400).json({error: 'no such donation'})
    }
    res.status(200).json(donor)
}

module.exports = {
    getDonations,
    getDonation,
    updateDonation


}