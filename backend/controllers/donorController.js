const Donors = require('../models/donorModel')
const mongoose = require('mongoose')

//Find all Donors
const getDonors = async (req, res) => {
    const donors = await Donors.find({})

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

//create new donor
const createDonor = async(req,res) => {
    const {firstName, lastName, email} = req.body
    let emptyFields = []

    if(!firstName){
        emptyFields.push('firstName')
    }
    if(!lastName){
        emptyFields.push('lastName')
    }
    if(!email){
        emptyFields.push('email')
    }
    
    if(emptyFields.length>0){
        return res.status(400).json({ error: 'Make sure to fill in the required fields: ', emptyFields})
    }
    
    try{
        const donor = await Donors.create({firstName, lastName, email})
        res.status(200).json(donor)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
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
    updateDonor,
    createDonor


}