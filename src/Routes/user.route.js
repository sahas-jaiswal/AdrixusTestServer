const express = require('express');
const router = express.Router();
const { signin, signup, getAllUsers } = require('../Controllers/user.controller');
const { createUserValidator, validateLogin, isRequestValidated } = require('../validators/user.validators');


router.post('/signup', createUserValidator, isRequestValidated, signup);
router.post('/signin',validateLogin,isRequestValidated, signin);
router.get('/getUsers',getAllUsers);


module.exports = router;