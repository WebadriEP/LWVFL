const express = require("express")
const router = express.Router()

const {
  getSummary,
  getSummaryByMonth,
  getSummaryByYear,
  getTotalMembers,
  getTotalDonations,
  getTotalDonationsAmount,
  getMembersPerMonth,
  getDonationsPerMonth,
  getDonationsAmountPerMonth,
} = require("../controllers/statsController")

router.get("/", getSummary) // get all stats
router.get("/month", getSummaryByMonth) // get stats by month
router.get("/year/:year", getSummaryByYear) // get stats by year
router.get("/totalmembers", getTotalMembers) // get total members
router.get("/totaldonations", getTotalDonations) // get total donations
router.get("/totaldonationsamount", getTotalDonationsAmount) // get total donations amount
router.get("/monthlymembers", getMembersPerMonth) // get number of members per month
router.get("/monthlydonations", getDonationsPerMonth) // get number of donations per month
router.get("/monthlydonationsamount", getDonationsAmountPerMonth) // get amount of donations per month

module.exports = router
