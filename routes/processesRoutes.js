const express = require('express');
const router = express.Router();
const processController = require('../controllers/processController');

router.post('/', processController.processSingleImg);

module.exports = router;