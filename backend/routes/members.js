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

// Endpoints for importing members from CSV (via /api/members/import)
router.route("/import").post(upload.single("csvFile"), async (req, res) => {
  // Convert CSV to JSON
  const jsonArray = await csv().fromFile(req.file.path)

  // Insert JSON array into MongoDB
  memberModel.insertMany(jsonArray, (error, result) => {
    if (error) {
      return res.status(500).json(error)
    }
    return res.status(200).json({ message: "Members imported successfully!" })
  })
})

module.exports = router
