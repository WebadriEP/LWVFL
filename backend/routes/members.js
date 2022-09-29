
const express = require("express")
const{
    getMembers,
    getMember,
    updateMember
} = require('../controllers/memberController')

const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

//router.use(requireAuth)

//get all Members
router.get('/', getMembers)

//get a single Member
router.get('/:id', getMember)

router.patch('/:id', updateMember)


module.exports = router