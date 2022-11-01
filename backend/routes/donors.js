const express = require("express")

const{
    getDonors,
    getDonor,
    updateDonor
} = require('../controllers/donorController')

const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

//router.use(requireAuth)

//get all Donors
router.get('/', getDonors)

//get a single Donor
router.get('/:id', getDonor)

router.patch('/:id', updateDonor)


module.exports = router