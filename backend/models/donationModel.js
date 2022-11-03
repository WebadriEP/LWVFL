const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Not sure if this is final or not, but it's here.

const donationSchema = new Schema({
  donationID: {
    type: String,
    required: true,
  },
  donor: {type: mongoose.Schema.Types.ObjectId, ref: 'Donor'},
  member: {type: mongoose.Schema.Types.ObjectId, ref: 'Member'},
})
  

module.exports = mongoose.model("Donation", donationSchema)