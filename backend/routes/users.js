const express = require('express');
const {registerUser, loginUser} = require('../controllers/userController');
const router = express.Router();

router.post('/login', loginUser); // login
router.post('/register', registerUser); // register

module.exports = router;