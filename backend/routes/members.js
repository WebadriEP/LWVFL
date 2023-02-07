const express = require("express")
const mongoose = require ("mongoose")

const{
    getMembers,
    getMember,
    createMember,
    updateMember,
    deleteMember
} = require('../controllers/memberController')

//const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

//router.use(requireAuth)

//get all Members
router.get('/', getMembers)

//get a single Member
router.get('/:id', getMember)

router.post('/', createMember)

router.patch('/:id', updateMember)

router.delete('/:id', deleteMember)

module.exports = router