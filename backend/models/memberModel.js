const mongoose = require("mongoose")

const Schema = mongoose.Schema

const memberSchema = new Schema({
    
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
    }
    
  }, {timestamps:true})
  module.exports = mongoose.model('Member', memberSchema)