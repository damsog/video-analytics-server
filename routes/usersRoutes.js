const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');

// api/users

/**
 * @swagger
 * /api/users:
 *  get:
 *      summary: Return all users
 *      tags: [Users]
 *      parameters:
 *          -   in: header
 *              name: x-access-token
 *              schema:
 *                  type: string
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
router.get('/', usersController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *      summary: Return user by id
 *      tags: [Users]
 *      parameters:
 *          -   in: header
 *              name: x-access-token
 *              schema:
 *                  type: string
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: user id
 *      responses:
 *          200:
 *              description: list of all users
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/user'
 *          404:
 *              description: User not found
 *                                
 */
router.get('/:id', usersController.getUserById);

/**
 * @swagger
 * /api/users:
 *  post:
 *      summary: Create a new user
 *      tags: [Users]
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
 *                      $ref: '#/components/schemas/user'
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
router.post('/', usersController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *      summary: Updates user
 *      tags: [Users]
 *      parameters:
 *          -   in: header
 *              name: x-access-token
 *              schema:
 *                  type: string
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: user id
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/user'
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/user'
 *          404:
 *              description: User not found
 *                                
 */
router.put('/:id', usersController.updateUserById);

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *      summary: Deletes a user by id
 *      tags: [Users]
 *      parameters:
 *          -   in: header
 *              name: x-access-token
 *              schema:
 *                  type: string
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: user id
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *          404:
 *              description: User not found
 *                                
 */
router.delete('/:id', usersController.deleteUserById);

/**
 * @swagger
 * components:
 *  schemas:
 *      user:
 *          type: object
 *          required:
 *              - username
 *              - password
 *          properties:
 *              id:
 *                  type: int
 *                  description: The auto-generated id of the user
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
 *              time_register:
 *                  type: string
 *                  description: time
 *              createdAt:
 *                  type: string
 *                  description: time
 *              updatedAt:
 *                  type: string
 *                  description: time
*/

module.exports = router;