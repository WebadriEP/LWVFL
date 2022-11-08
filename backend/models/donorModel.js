const mongoose = require("mongoose")
const Schema = mongoose.Schema

const donorSchema = new Schema({

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

      donations: {
        tpye: Array,
        required: false
      }
})

module.exports = mongoose.model('Donor', donorSchema)