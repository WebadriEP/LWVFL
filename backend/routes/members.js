const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const multer = require("multer")
const memberModel = require("../models/memberModel")
const csv = require("csvtojson")

const {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
  exportMembers,
  getStatTotalMembers,
  getStatTotalDonations,
  getStatTotalDonationsAmount,
} = require("../controllers/memberController")

// File uploading
const storage = multer.diskStorage({
  // Tells multer where to store the file
  destination: (req, file, callback) => {
    callback(null, "./uploads")
  },
  // Tells multer what to name the file
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  },
})

// Tells multer to use the storage configuration
const upload = multer({ storage: storage })

//const requireAuth = require('../middleware/requireAuth')
//router.use(requireAuth)

router.get("/", getMembers) // get all members
router.get("/:id", getMember) // get a single member
router.post("/", createMember) // create a member
router.patch("/:id", updateMember) // update a member
router.delete("/:id", deleteMember) // delete a member
router.get("/export", exportMembers) // export all members
router.get("/stat/total", getStatTotalMembers) // get total members
router.get("/stat/donations", getStatTotalDonations) // get total donations
router.get("/stat/donationsamount", getStatTotalDonationsAmount) // get total donations amount

// Importing members from CSV (via /api/members/import)
router.post("/import", upload.single("csvFile"), async (req, res) => {
  try {
    // Convert CSV to JSON
    const jsonArray = await csv().fromFile(req.file.path)

    // Insert JSON array into MongoDB
    memberModel.insertMany(jsonArray, (error, result) => {
      if (error) {
        return res.status(500).json(error)
      }
      return res.status(200).json({ message: "Members imported successfully!" })
    })
    res.json(jsonArray)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
