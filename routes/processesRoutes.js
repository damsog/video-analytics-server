const express = require('express');
const router = express.Router();
const processController = require('../controllers/processController');

router.post('/', processController.processSingleImg);
router.post('/reloadcodes', processController.reloadCodesToGroup);

module.exports = router;