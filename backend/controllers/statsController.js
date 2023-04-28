const endOfDay = require("date-fns/endOfDay")
const startOfDay = require("date-fns/startOfDay")
const MemberModel = require("../models/memberModel")
const DonationModel = require("../models/donationModel")
const mongoose = require("mongoose")
mongoose.set("toJSON", { virtuals: true })

/*
 * Get all stats for ALL TIME
 */
const getSummary = async (req, res) => {
  try {
    let totalDonations = 0
    let totalDonationsAmount = 0

    const members = await MemberModel.find({}).sort({ createdAt: -1 })
    const donations = await DonationModel.find({}).sort({ createdAt: -1 })

    // Get total # of donations
    members.forEach((member) => {
      totalDonations += member.donations.length
    })

    // Get total donations amount in $USD
    donations.forEach((donation) => {
      totalDonationsAmount += donation.amount
    })

    // Format total donations amount to include commas
    totalDonationsAmount = totalDonationsAmount.toLocaleString("en-US")

    // Return stats
    res.status(200).json({
      totalMembers: members.length,
      totalDonations: donations.length,
      totalDonationsAmount: totalDonationsAmount,
    })
  } catch (error) {
    res.status(500).json(error)
  }
}

/*
 * Get summary for CURRENT MONTH
 */
const getSummaryByMonth = async (req, res) => {
  try {
    const members = await MemberModel.find({
      createdAt: {
        $gte: startOfDay(new Date()),
        $lte: endOfDay(new Date()),
      },
    })

    const donations = await DonationModel.find({
      createdAt: {
        $gte: startOfDay(new Date()),
        $lte: endOfDay(new Date()),
      },
    })

    let totalDonations = 0
    let totalDonationsAmount = 0

    // Get total # of donations and total donations amount in $USD
    donations.forEach((donation) => {
      totalDonations++
      totalDonationsAmount += donation.amount
    })

    // Format total donations amount to include commas
    totalDonationsAmount = totalDonationsAmount.toLocaleString("en-US")

    res.status(200).json({
      totalMembers: members.length,
      totalDonations: totalDonations,
      totalDonationsAmount: totalDonationsAmount,
    })
  } catch (error) {
    res.status(500).json(error)
  }
}

/*
 * Get summary by year
 */
const getSummaryByYear = async (req, res) => {
  try {
    const members = await MemberModel.find({}).sort({ createdAt: -1 })
    let totalDonations = 0
    let totalDonationsAmount = 0
    members.forEach((member) => {
      totalDonations += member.donations.length
      member.donations.forEach((donation) => {
        totalDonationsAmount += donation.donationAmount
      })
    })
    res.status(200).json({
      totalMembers: members.length,
      totalDonations: totalDonations,
      totalDonationsAmount: totalDonationsAmount,
    })
  } catch (error) {
    res.status(500).json(error)
  }
}

/*
 * Get total members
 */
const getTotalMembers = async (req, res) => {
  try {
    const members = await MemberModel.find({}).sort({ createdAt: -1 })
    res.status(200).json(members.length)
  } catch (error) {
    res.status(500).json(error)
  }
}

/*
 * Get total donations
 */
const getTotalDonations = async (req, res) => {
  try {
    const members = await MemberModel.find({}).sort({ createdAt: -1 })
    let totalDonations = 0
    members.forEach((member) => {
      totalDonations += member.donations.length
    })
    res.status(200).json(totalDonations)
  } catch (error) {
    res.status(500).json(error)
  }
}

/*
 * Get total donations amount
 */
const getTotalDonationsAmount = async (req, res) => {
  try {
    const members = await MemberModel.find({}).sort({ createdAt: -1 })
    let totalDonationsAmount = 0
    members.forEach((member) => {
      member.donations.forEach((donation) => {
        totalDonationsAmount += donation.donationAmount
      })
    })
    res.status(200).json(totalDonationsAmount)
  } catch (error) {
    res.status(500).json(error)
  }
}

/*
 * Get number of members per month
 */
const getMembersPerMonth = async (req, res) => {
  try {
    const members = await MemberModel.find({}).sort({ createdAt: -1 })
    // Create array with the number of members per month, starting from 0
    const membersPerMonth = new Array(12).fill(0)

    // Loop through members and increment the month index in the array
    members.forEach((member) => {
      const month = new Date(member.createdAt).getMonth()
      membersPerMonth[month] += 1
    })

    res.status(200).json(membersPerMonth)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  getSummary,
  getSummaryByMonth,
  getSummaryByYear,
  getTotalMembers,
  getTotalDonations,
  getTotalDonationsAmount,
  getMembersPerMonth,
}
