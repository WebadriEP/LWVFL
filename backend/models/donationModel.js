const mongoose = require("mongoose")
const Schema = mongoose.Schema

const donationSchema = new Schema({

    donorID: {
        type: String,
        required: true,
      },

      date: {
        type: Date,
        required: true,
      },

      amount: {
        type: Number,
        required: true,
      },

      type: {
        type: String,
        required: false,
      },

      notes: {
        type: String,
        required: false,
      },
      
})

export default donationSchema;