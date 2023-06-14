const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

// Routes

router.route('/signup').post(userController.createUsers);
router.route('/login').post(userController.loginUsers);

module.exports = router;
