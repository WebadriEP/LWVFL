const express = require("express")

const{
    getDonors,
    getDonor,
    updateDonor,
    createDonor
} = require('../controllers/donorController')

const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

//router.use(requireAuth)

//get all Donors
router.get('/', getDonors)

//get a single Donor
router.get('/:id', getDonor)

//create new donor
router.post('/', createDonor)

//edit donor
router.patch('/:id', updateDonor)


module.exports = router