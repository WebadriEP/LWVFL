const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new Schema({
    
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
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    }
  });


  userSchema.statics.register = async function (firstName, lastName, email, password, address, city, phone) {
    if (!email || !password || !firstName || !lastName || !address || !city || !phone) {
      throw Error('All fields are required')
    }

    if (!validator.isEmail(email)) {
      throw Error('Email is invalid')
    }
    // if (!validator.isStrongPassword(password)) {
    //   throw Error('Password not strong enough');
    // }

    const exists = await this.findOne({ email })

    if (exists) {
      throw Error('Email already exists')
    }

     const salt = await bcrypt.genSalt(10)
     const hash = await bcrypt.hash(password, salt)
    
    const user = await this.create({ firstName, lastName, email, password: hash, address, city, phone})
    console.log(user)

    return user
  }

  
  
  userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
      throw new Error("All fields are required");
    }
    const user = await this.findOne({ email })

    if (!user) {
      throw new Error("User does not exist");
    }
    const match = await bcrypt.compare(password, user.password);

  // if passwords do not match, throw error
  if (!match) {
    throw new Error("Incorrect password");
  }

  return user;
};

  module.exports = mongoose.model('User', userSchema)
  