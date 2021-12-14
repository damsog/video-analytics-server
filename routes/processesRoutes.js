const express = require('express');
const router = express.Router();
const processController = require('../controllers/processController');

// /api/process/reloadcodes
/**
 * @swagger
 * /api/process:
 *  post:
 *      summary: Rquests to reload codes of a group and save them to a file
 *      tags: [Process]
 *      parameters:
 *          -   in: header
 *              name: x-access-token
 *              schema:
 *                  type: string
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          groupId:
 *                              type: int
 *                              description: The id of the group to use as reference
 *                              example: "1"
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/image'
 *          404:
 *              description: Coder not found
 */
router.post('/', processController.processSingleImg);

// /api/process/reloadcodes
/**
 * @swagger
 * /api/process/reloadcodes:
 *  post:
 *      summary: Rquests to reload codes of a group and save them to a file
 *      tags: [Process]
 *      parameters:
 *          -   in: header
 *              name: x-access-token
 *              schema:
 *                  type: string
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          groupId:
 *                              type: int
 *                              description: The id of the group to use as reference
 *                              example: "1"
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/image'
 *          404:
 *              description: Coder not found
 */
router.post('/reloadcodes', processController.reloadCodesToGroup);

module.exports = router;