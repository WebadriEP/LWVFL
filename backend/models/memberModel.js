const mongoose = require("mongoose")

const Schema = mongoose.Schema

const memberSchema = new Schema({
  // CHANGED TO FULL NAME INSTEAD OF SEPARATE FIRST AND LAST NAME FOR THE SCHEMA
  // THIS ALLOWS THE SEARCH FUNCTION TO SEARCH FOR BOTH FIRST AND LAST NAME AT THE SAME TIME
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  }
}, {timestamps:true})
  module.exports = mongoose.model('Member', memberSchema)

