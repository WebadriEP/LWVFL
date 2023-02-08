const Donations = require('../models/donationModel')

//Find all donations
const getDonations = async (req, res) => {
    const donations = await Donations.find({})

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

//Find all donations belonging to a particular donor
const getDonationsofDonor = async (req, res) => {
    const { id } = req.params
    
    const donations = await Donations.find({donorID: id}).sort({ createdAt: -1 })

    res.status(200).json(donations)
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

//create new donation
const createDonation = async(req,res) => {
    const {donorID, date, amount, type, notes} = req.body
    let emptyFields = []

    if(!donorID){
        emptyFields.push('donor ID')
    }
    if(!date){
        emptyFields.push('date')
    }
    if(!amount){
        emptyFields.push('amount')
    }
    
    if(emptyFields.length>0){
        return res.status(400).json({ error: 'Make sure to fill in the required fields: ', emptyFields})
    }
    
    try{
        const donation = await Donations.create({donorID, date, amount, type, notes})
        res.status(200).json(donation)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getDonations,
    getDonation,
    getDonationsofDonor,
    updateDonation,
    createDonation


}