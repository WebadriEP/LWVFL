const express = require("express")
const router = express.Router()

const {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
  exportMembers,
} = require("../controllers/memberController")

//const requireAuth = require('../middleware/requireAuth')
//router.use(requireAuth)

router.get("/", getMembers) // get all members
router.get("/:id", getMember) // get a single member
router.post("/", createMember) // create a member
router.patch("/:id", updateMember) // update a member
router.delete("/:id", deleteMember) // delete a member
router.get("/export", exportMembers) // export all members

module.exports = router
