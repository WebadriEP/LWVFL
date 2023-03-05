const express = require('express');
const {registerUser, loginUser, getUsers, deleteUsers, updateUsers, getUser, updateUserPassword} = require('../controllers/userController');

const router = express.Router();

router.get('/get/:id', getUser);
router.get('/get', getUsers); //getUsers
router.delete('/delete/:id', deleteUsers);
router.put('/update/:id', updateUsers);
router.post('/login', loginUser); // login
router.post('/register', registerUser); // register
router.put('/update/password/:id', updateUserPassword);

module.exports = router;