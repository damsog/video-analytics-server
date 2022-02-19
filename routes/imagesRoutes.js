const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imagesController');

//router.post('/saveimage/:username/:profilename', imagesController.saveImage);

/**
 * @swagger
 * /api/images/{userId}/{profileId}:
 *  post:
 *      summary: Create a new Image associated to a profile
 *      security:
 *          - bearerAuth: []
 *      tags: [Images]
 *      parameters:
 *          -   in: path
 *              name: userId
 *              schema:
 *                  type: string
 *              required: true
 *              description: User id
 *          -   in: path
 *              name: profileId
 *              schema:
 *                  type: string
 *              required: true
 *              description: Profile id
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          profilePicture:
 *                              type: string
 *                              format: binary
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
 *      security:
 *          - bearerAuth: []
 *      tags: [Images]
 *      parameters:
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
 *      security:
 *          - bearerAuth: []
 *      tags: [Images]
 *      parameters:
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
 *      security:
 *          - bearerAuth: []
 *      tags: [Images]
 *      parameters:
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
 *      security:
 *          - bearerAuth: []
 *      tags: [Images]
 *      parameters:
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
 *      security:
 *          - bearerAuth: []
 *      tags: [Images]
 *      parameters:
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
 * /api/images/encode:
 *  post:
 *      summary: Requests saved Images to be encoded
 *      security:
 *          - bearerAuth: []
 *      tags: [Images]
 *      parameters:
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          images_ids:
 *                              type: array
 *                              items:
 *                                  type: string
 *                              example: ["1","2","3"]
 *                      
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
router.post('/encode', imagesController.encodeImages);

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