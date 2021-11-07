const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');

// api/users
router.post('/', usersController.createUser);

module.exports = router;