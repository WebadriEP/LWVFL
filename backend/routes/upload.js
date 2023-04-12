const express = require("express")
const multer = require("multer")
const router = express.Router()
const upload = multer()
const csv = require("csvtojson")
const memberModel = require("../models/memberModel")

// Get request to /api/upload to test the upload route
router.get("/", (req, res) => {
  res.send("Upload route")
})

// Post request to /api/upload to upload a file
router.post("/", upload.single("file"), async (req, res) => {
  const {
    file,
    body: { name },
  } = req

  // Convert CSV to JSON
  const json = await csv().fromFile(file)

  // Send to MongoDB
  memberModel.insertMany(json, (err, result) => {
    if (err) {
      res.status(500).json({ error: err })
    } else {
      res.status(200).json({ message: "Members uploaded successfully!" })
    }
  })
})

module.exports = router
