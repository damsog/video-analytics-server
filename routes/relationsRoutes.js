const express = require("express");
const router = express.Router();
const relationsController = require("../controllers/relationsController");

/**
 * @swagger
 * /api/relations:
 *  post:
 *      summary: Create a new group-profile association
 *      tags: [Relations]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/relation'
 *      responses:
 *          200:
 *              description: relation just created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/relation'
 *                                
 */
router.post('/', relationsController.createRelation);

/**
 * @swagger
 * /api/relations:
 *  delete:
 *      summary: Deletes a group-profile relation
 *      tags: [Relations]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/relation'
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
router.delete('/', relationsController.deleteRelation);


/**
 * @swagger
 * components:
 *  schemas:
 *      relation:
 *          type: object
 *          required:
 *              - groupId
 *              - profileId
 *          properties:
 *              id:
 *                  type: int
 *                  description: The auto-generated id of the user
 *              groupId:
 *                  type: string
 *                  description: id of the parent group
 *              profileId:
 *                  type: string
 *                  description: if of a belonging profile
 *              time_creation:
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