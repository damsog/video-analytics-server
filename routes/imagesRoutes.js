const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imagesController');

//router.post('/saveimage/:username/:profilename', imagesController.saveImage);

/**
 * @swagger
 * /api/images:
 *  post:
 *      summary: Create a new Image associated to a profile
 *      tags: [Images]
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
 *                      $ref: '#/components/schemas/image'
 *      responses:
 *          200:
 *              description: Image just created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/image'
 *                                
 */
router.post('/:userId/:profileId', imagesController.saveImage, imagesController.createImageRecord);

/**
 * @swagger
 * /api/images:
 *  get:
 *      summary: Returns all images
 *      tags: [Images]
 *      parameters:
 *          -   in: header
 *              name: x-access-token
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: list of every single image
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/image'
 *                                
 */
router.get('/', imagesController.getAllImages);

/**
 * @swagger
 * /api/images/{id}:
 *  get:
 *      summary: Return an image given its id
 *      tags: [Images]
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
 *                              $ref: '#/components/schemas/image'
 *                                
 */
router.get('/:id', imagesController.getImageById);

/**
 * @swagger
 * /api/images/{id}:
 *  put:
 *      summary: Updates coder info
 *      tags: [Images]
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
 *              description: Image id
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/image'
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/image'
 *          404:
 *              description: Coder not found
 *                                
 */
router.put('/:id', imagesController.updateImageById);

/**
 * @swagger
 * /api/images/{id}:
 *  delete:
 *      summary: Deletes an image given an id
 *      tags: [Images]
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
 *              description: Image id
 *      responses:
 *          200:
 *              description: Operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *          404:
 *              description: Image not found
 *                                
 */
router.delete('/:id', imagesController.deleteImageById);

/**
 * @swagger
 * /api/images/bypId/{profileId}:
 *  get:
 *      summary: Return all images for a profile
 *      tags: [Images]
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
 *                              $ref: '#/components/schemas/image'
 *                                
 */
router.get('/bypId/:profileId', imagesController.getImagesByProfileId);

/**
 * @swagger
 * components:
 *  schemas:
 *      image:
 *          type: object
 *          required:
 *              - coder_img_route
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