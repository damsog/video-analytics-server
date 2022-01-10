const express = require('express');
const router = express.Router();
const processController = require('../controllers/processController');

// /api/process/analyzeimg
/**
 * @swagger
 * /api/process/analyzeimg:
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
 *                          return_img:
 *                              type: 1
 *                              description: The id of the group to use as reference
 *                              example: "1"
 *                          img:
 *                              type: str
 *                              description: the image to process as b64
 *                              example: "/9j/4AAQSk..."
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
router.post('/analyzeimg', processController.processAnalyzeImg);

// /api/process/detectimg
/**
 * @swagger
 * /api/process/detectimg:
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
 *                          return_img:
 *                              type: 1
 *                              description: The id of the group to use as reference
 *                              example: "1"
 *                          img:
 *                              type: str
 *                              description: the image to process as b64
 *                              example: "/9j/4AAQSk..."
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/image'
 */
router.post('/detectimg', processController.processDetectImg);

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

router.post('/facedetection/stream', processController.faceDetectionStream);

module.exports = router;