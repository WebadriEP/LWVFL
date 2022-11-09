const express = require('express');
const {registerUser, loginUser} = require('../controllers/userController');

const router = express.Router();

router.post('/api/user/login', loginUser); // login
router.post('/api/user/register', registerUser); // register

module.exports = router;