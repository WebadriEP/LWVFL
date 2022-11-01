const express = require("express")

const{
    getDonations,
    getDonation,
    updateDonation
} = require('../controllers/donationController')

const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

//router.use(requireAuth)

//get all Donations
router.get('/', getDonations)

//get a single Donation
router.get('/:id', getDonation)

router.patch('/:id', updateDonation)


module.exports = router