const express = require("express");
const router = express.Router();
const groupsController = require("../controllers/groupsController");
const relationsController = require("../controllers/relationsController");

// /api/groups
/**
 * @swagger
 * /api/groups:
 *  post:
 *      summary: Create a new group associating it with a user
 *      tags: [Groups]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/group'
 *      responses:
 *          200:
 *              description: Group just created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/group'
 *                                
 */
router.post('/', groupsController.createGroup);

/**
 * @swagger
 * /api/groups:
 *  get:
 *      summary: Returns all groups
 *      tags: [Groups]
 *      responses:
 *          200:
 *              description: list of every group
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/group'
 *                                
 */
router.get('/', groupsController.getAllGroups);

/**
 * @swagger
 * /api/groups/{id}:
 *  get:
 *      summary: Return a group given its id
 *      tags: [Groups]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: group id
 *      responses:
 *          200:
 *              description: Group information
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/group'
 *                                
 */
router.get('/:id', groupsController.getGroupById);

/**
 * @swagger
 * /api/groups/{id}:
 *  put:
 *      summary: Updates group info
 *      tags: [Groups]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: Group id
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/group'
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/group'
 *          404:
 *              description: User not found
 *                                
 */
router.put('/:id', groupsController.updateGroupById);

/**
 * @swagger
 * /api/groups/{id}:
 *  delete:
 *      summary: Deletes a group given an id
 *      tags: [Groups]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: group id
 *      responses:
 *          200:
 *              description: Operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *          404:
 *              description: User not found
 *                                
 */
router.delete('/:id', groupsController.deleteGroupById);

/**
 * @swagger
 * /api/groups/byuId/{userId}:
 *  get:
 *      summary: Return all groups for a user
 *      tags: [Groups]
 *      parameters:
 *          -   in: path
 *              name: userId
 *              schema:
 *                  type: string
 *              required: true
 *              description: user id
 *      responses:
 *          200:
 *              description: list of all groups for a user
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/group'
 *                                
 */
router.get('/byuId/:userId', groupsController.getGroupsByUserId);

/**
 * @swagger
 * /api/groups/bypId/{profileId}:
 *  get:
 *      summary: Returns all the groups a profile belongs to
 *      tags: [Groups]
 *      parameters:
 *          -   in: path
 *              name: profileId
 *              schema:
 *                  type: string
 *              required: true
 *              description: profile id
 *      responses:
 *          200:
 *              description: list of groups a profile belongs to
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/group'
 *                                
 */
router.get('/bypId/:profileId', relationsController.getGroupsByProfile);

/**
 * @swagger
 * components:
 *  schemas:
 *      group:
 *          type: object
 *          required:
 *              - name
 *              - dataset_route
 *          properties:
 *              id:
 *                  type: int
 *                  description: The auto-generated id of the user
 *              name:
 *                  type: string
 *                  description: Full name of the profile
 *              dataset_route:
 *                  type: string
 *                  description: route where the dataset resides
 *              time_creation:
 *                  type: string
 *                  description: time
 *              createdAt:
 *                  type: string
 *                  description: time
 *              updatedAt:
 *                  type: string
 *                  description: time
 *              userId:
 *                  type: int
 *                  description: id of the parent user
*/

module.exports = router;