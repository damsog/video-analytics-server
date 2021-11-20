const express = require('express');
const router = express.Router();
const codersController = require('../controllers/codersController');

router.post('/upload_image/:username/:profilename', codersController.uploadImage);

/**
 * @swagger
 * /api/coders:
 *  post:
 *      summary: Create a new coder associated to a profile
 *      tags: [Coders]
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
 *                      $ref: '#/components/schemas/coder'
 *      responses:
 *          200:
 *              description: Coder just created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/coder'
 *                                
 */
router.post('/', codersController.createCoder);

/**
 * @swagger
 * /api/coders:
 *  get:
 *      summary: Returns all coders
 *      tags: [Coders]
 *      parameters:
 *          -   in: header
 *              name: x-access-token
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: list of every single coder
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/coder'
 *                                
 */
router.get('/', codersController.getAllCoders);

/**
 * @swagger
 * /api/coders/{id}:
 *  get:
 *      summary: Return a coder given its id
 *      tags: [Coders]
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
 *              description: coder id
 *      responses:
 *          200:
 *              description: Coder information
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/coder'
 *                                
 */
router.get('/:id', codersController.getCoderById);

/**
 * @swagger
 * /api/coders/{id}:
 *  put:
 *      summary: Updates coder info
 *      tags: [Coders]
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
 *              description: Coder id
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/coder'
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/coder'
 *          404:
 *              description: Coder not found
 *                                
 */
router.put('/:id', codersController.updateCoderById);

/**
 * @swagger
 * /api/coders/{id}:
 *  delete:
 *      summary: Deletes a coder given an id
 *      tags: [Coders]
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
 *              description: Coder id
 *      responses:
 *          200:
 *              description: Operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *          404:
 *              description: Coder not found
 *                                
 */
router.delete('/:id', codersController.deleteCoderById);

/**
 * @swagger
 * /api/coders/bypId/{profileId}:
 *  get:
 *      summary: Return all coders for a profile
 *      tags: [Coders]
 *      parameters:
 *          -   in: header
 *              name: x-access-token
 *              schema:
 *                  type: string
 *          -   in: path
 *              name: profileId
 *              schema:
 *                  type: string
 *              required: true
 *              description: Profile id
 *      responses:
 *          200:
 *              description: list of all groups for a user
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/coder'
 *                                
 */
router.get('/bypId/:profileId', codersController.getCodersByProfileId);

/**
 * @swagger
 * components:
 *  schemas:
 *      coder:
 *          type: object
 *          required:
 *              - coder_img_route
 *              - coder
 *          properties:
 *              id:
 *                  type: int
 *                  description: The auto-generated id of the coder
 *              coder_img_route:
 *                  type: string
 *                  description: Route of the refference img
 *              coder:
 *                  type: string
 *                  description: coder generated for the image
 *              time_creation:
 *                  type: string
 *                  description: time
 *              createdAt:
 *                  type: string
 *                  description: time
 *              updatedAt:
 *                  type: string
 *                  description: time
 *              profileId:
 *                  type: int
 *                  description: id of the parent profile
*/

module.exports = router;