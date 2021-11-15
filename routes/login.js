const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');

/**
 * @swagger
 * /api/login:
 *  post:
 *      summary: Login
 *      tags: [Users]
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
 router.post('/', usersController.getAccess);

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

module.exports = router;