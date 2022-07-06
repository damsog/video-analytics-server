const express = require("express");
const router = express.Router();
const accessController = require('../controllers/accessController');

/**
 * @swagger
 * /api/access/login:
 *  post:
 *      summary: Login
 *      tags: [Access]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/user_access'
 *      responses:
 *          200:
 *              description: Access response with token
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/user'
 *                                
 */
 router.post('/login', accessController.getAccess);

 /**
 * @swagger
 * /api/access/create:
 *  post:
 *      summary: Create a new user
 *      security:
 *          - bearerAuth: []
 *      tags: [Access]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/userToCreate'
 *      responses:
 *          200:
 *              description: list of all users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/user'
 *                                
 */
router.post('/create', accessController.createUser);

 /**
 * @swagger
 * components:
 *  schemas:
 *      user_access:
 *          type: object
 *          required:
 *              - username
 *              - password
 *          properties:
 *              username:
 *                  type: string
 *                  description: Username set by user
 *              password:
 *                  type: string
 *                  description: key to access
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      userToCreate:
 *          type: object
 *          required:
 *              - username
 *              - password
 *          properties:
 *              username:
 *                  type: string
 *                  description: Username set by user
 *              password:
 *                  type: string
 *                  description: key to access
 *              fullname:
 *                  type: string
 *                  description: full name of the user
 *              nick:
 *                  type: string
 *                  description: short name
 *              logo:
 *                  type: string
 *                  description: logo saved as b64
*/

module.exports = router;