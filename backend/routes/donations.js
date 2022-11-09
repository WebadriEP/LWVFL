const express = require("express")

const{
    getDonations,
    getDonation,
    updateDonation,
    createDonation
} = require('../controllers/donationController')

const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

//router.use(requireAuth)

//get all Donations
router.get('/', getDonations)

//get a single Donation
router.get('/:id', getDonation)

//create a new Donation
router.post('/', createDonation)

router.patch('/:id', updateDonation)


module.exports = router