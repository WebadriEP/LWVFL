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
  },
  phone: {
    type: String,
    required: true,
  },
  homeAddress: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  birthMonth: {
    type: String,
  },
  birthDay: {
    type: String,
  },
  birthYear: {
    type: String,
  },
  memberNotes: {
    type: String,
    default: 'This member has no notes.'
  },
  memberActiveStatus: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
    required: true,
  },
  memberType: {
    type: String,
    enum: ['member', 'donor', 'memberdonor'],
    default: 'member',
    required: true,
  },
  isStudent: {
    type: Boolean,
    default: false,
  },
  memberStatus: {
    type: String,
    enum: ['none', 'engage', 'contacted', 'other'],
    default: 'none',
    required: true,
  },
  donations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Donation',
    }
  ]
}, 
{
  virtuals: {
    // Allows calling member.fullName instead of member.firstName + member.lastName
    fullName: {
      get() {
        return `${this.firstName} ${this.lastName}`
      },
      set(v) { // Allows setting member.fullName to set both member.firstName and member.lastName
        this.name.first = v.substr(0, v.indexOf(' '));
        this.name.last = v.substr(v.indexOf(' ') + 1);
      }
    },
    address: {
      get() {
        return `${this.homeAddress} ${this.addressLine2} ${this.city} ${this.state} ${this.zip}`
      }
    },
    birthday: {
      get() {
        return `${this.birthMonth}-${this.birthDay}-${this.birthYear}`
      },
    }
  }
}, {timestamps:true})
  module.exports = mongoose.model('Member', memberSchema)

