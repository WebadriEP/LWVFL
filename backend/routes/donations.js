const express = require("express")

const{
    getDonations,
    getDonation,
    getDonationsofDonor,
    updateDonation,
    createDonation,
    deleteDonation
} = require('../controllers/donationController')

const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

//router.use(requireAuth)

//get all Donations
router.get('/', getDonations)

//get a single Donation
router.get('/:id', getDonation)

//get all donations from one donor
router.get('/list/:id', getDonationsofDonor)

//create a new Donation
router.post('/:id', createDonation)

router.patch('/:id', updateDonation)

router.delete("/:id", deleteDonation)


module.exports = router