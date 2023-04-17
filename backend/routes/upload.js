const express = require("express")
const multer = require("multer")
const router = express.Router()
const csvtojson = require("csvtojson")
const memberModel = require("../models/memberModel")

// Multer config
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// Post request to /api/upload to upload a file
router.post("/", upload.any(), async (req, res, next) => {
  try {
    // Convert CSV to JSON
    const json = await csvtojson().fromString(req.files[0].buffer.toString())

    // Send to MongoDB
    memberModel.insertMany(json, (err, result) => {
      if (err) {
        res.status(500).json({ error: err })
      } else {
        res.status(200).json({ message: "Members uploaded successfully!" })
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

module.exports = router
