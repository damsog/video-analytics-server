const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');

// api/users
router.post('/', usersController.createUser);
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.put('/:id', usersController.updateUserById);
router.delete('/:id', usersController.deleteUserById);

module.exports = router;