const mongoose = require("mongoose")
const Schema = mongoose.Schema

const donationSchema = new Schema(
  {
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
  },
  {
    virtuals: {
      createdAt: {
        get() {
          return this._id.getTimestamp()
        },
      },
    },
  }
)

donationSchema.set("timestamps", true)

module.exports = mongoose.model("Donation", donationSchema)
