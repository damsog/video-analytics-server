const express = require("express");
const router = express.Router();
const profilesController = require("../controllers/profilesController");

router.post('/', profilesController.createProfile);
router.get('/', profilesController.getAllProfiles);
router.get('/:id', profilesController.getProfileById);
router.put('/:id', profilesController.updateProfileById);
router.delete('/:id', profilesController.deleteProfileById);