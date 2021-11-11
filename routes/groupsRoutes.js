const express = require("express");
const router = express.Router();
const groupsController = require("../controllers/groupsController");

// /api/groups
router.post('/', groupsController.createGroup);
router.get('/', groupsController.getAllGroups);
router.get('/:id', groupsController.getGroupById);
router.put('/:id', groupsController.updateGroupById);
router.delete('/:id', groupsController.deleteGroupById);
router.get('/buid/:userId', groupsController.getGroupsByUserId);
//router.get('/bpid/:profileId'); //?

module.exports = router;