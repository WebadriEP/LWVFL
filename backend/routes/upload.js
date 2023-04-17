const express = require("express")
const multer = require("multer")
const router = express.Router()
const csv = require("csvtojson")
const memberModel = require("../models/memberModel")

// body parser
//srouter.use(express.json())

const upload = multer({
  storage: storage,
})

const storage = multer.diskStorage({
  // Where the file will be saved
  destination: (req, file, callback) => {
    callback(null, "/uploads")
  },

  // Rename the file
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}_${file.originalname}`)
  },

  inMemory: true,
})

// Post request to /api/upload to upload a file
router.post("/", upload.single("file"), async (req, res) => {
  const file = req.body
  const json = await csv().fromFile(file) // Convert CSV to JSON

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
