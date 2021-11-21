const images = require('../models/images');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { request } = require('express');
require('dotenv').config()


// Setting multer for uploading files. the path where files will
// be savd to. each user has profile folders, and each profile 
// folder can have multiple pictures.
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './resources/user_data/' + req.params.userId + '/' + req.params.profileId);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

// describing the file to upload. set limits and restrictions
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 10
    }
});

// Controller to save an image file on the server. after this, the
// function CreateImageRecord should be used to store the registry 
// of the uploaded image
exports.saveImage = (req, res, next) => {
    console.log("Uploading image to profile " + req.params.userId);
    var dir = './resources/user_data/' + req.params.userId + '/' + req.params.profileId;
    // TODO: Check if profileId exists
    // TODO: Check if file already exists
    try {
        var response = { success : true };
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true});
            response['details'] = " Resource Just created";
        }
        upload.single('profilePicture')(req,res,next);
      
        
    } catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong');
    }

}

// Controller to create a new image registry. This should be called 
// after an image was saved to use the path as input for the record
exports.createImageRecord = async (req,res, next) => {
    try {
        // Checks if the file exists and not updates the DB
        const exist_response = await images.findOne({where: {coder_img_route: req.file.path} });

        let response = {}
        if(exist_response){

            // If file already exist doesn't create a new record
            response = {
                success: false,
                message: "A file with the same name already exists"
            }

        }else{

            // If file doesn't exist then create an image record
            response = await images.create({
                coder_img_route: path.join(__dirname, '../')+req.file.path,
                profileId: req.body.profileId
            }).then((data) => {
                const res = {
                    success: true,
                    message: "Query executed correctly",
                    data: data
                }
                return res;
            }).catch((error) => {
                const res = { success: false, error: error }
                return res;
            });              
        }

        res.json(response);
    } catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong');
    }
}

// Controller to get a list of all images
exports.getAllImages = async (req,res) => {
    try {
        const response = await images.findAll().then((data) => {
            const res = {
                success: true,
                message: "Query executed succesfully",
                data: data
            }

            return res;
        }).catch((error) => {
            const res = { success: false, error: error }
            return res;
        }) ;

        res.json(response);
    } catch (e) {
        console.log(e);
        res.status(500).log("There was an error ")
    }
}

// Controller to get an image info given an id
exports.getImageById = async (req,res) => {
    try {
        const response = await images.findByPk(req.params.id).then((data) => {
            const res = {
                success: true,
                message: "Query executed successfully",
                data: data
            }
            return res;
        }).catch((error) => {
            const res = { success:false, error: error}
            return res;
        })
        res.json(response);
    } catch (e) {
        console.log(e);
        res.status(500).log("There was an error ")
    }
}

// Controller to update a profile info
exports.updateImageById = async (req,res) => {
    try {
        const { coder_img_route, coder, profileId } = req.body;
        const response = await images.update({
            coder_img_route: coder_img_route,
            coder: coder,
            profileId: profileId
        }, {
            where: {id: req.params.id }
        }).then((data) => {
            const res = {
                success: true,
                message: "Query executed successfully",
                data: data
            }
            return res;
        }).catch((error) => {
            const res = {success: false , error, error}
            return res;
        })

        res.json(response);
    } catch (e) {
        console.log(e);
        res.status(500).log("There was an error ")
    }
}

// Controller to destroy a coder given an id
exports.deleteImageById = async (req,res) => {
    try {
        const response = await images.destroy({
                where: {id: req.params.id}    
        }).then((data) => {
            const res = {
                success: true,
                message: "Query executed successfully",
                data: data
            }
            return res;
        }).catch((error) => {
            const res = {success: false, error:error}
            return res;
        });

        res.json(response);
    } catch (e) {
        console.log(e);
        res.status(500).log("There was an error ")
    }
}

// Controller to get the list of groups that belong to a user
exports.getImagesByProfileId = async (req,res) => {
    try {
        const response = await images.findAll({
            where: {
                profileId: req.params.profileId
            }    
        }).then((data) => {
            const res = {
                success: true,
                message: "Query executed successfully",
                data, data
            }
            return res;
        }).catch((error) => {
            const res = { success:false, error: error}
            return res;
        })
        res.json(response);
    } catch (e) {
        console.log(e);
        res.status(500).log("There was an error ")
    }
}

// Controller to request the embedding of the images.
// This function requests to the python analytics server
// And saves the result in the DB for each image.
exports.encodeImages = async (req,res) => {
    try {
        const images_ids = req.body.images_ids;
        
        // TODO: What to do with images that dont exist
        const images_routes = await images.findAll({
            attributes: ['id','coder_img_route'],
            where: {id: images_ids }
        }).catch((error) => {
            const res = { success: false, error: error }
            return res;
        });
        
        // Getting the list of images (routes) and the list of ids of images found
        var img_list = []
        var found_imgs_ids = [];
        for(let i=0;i<images_routes.length;i++){
            img_list.push(images_routes[i]['coder_img_route']);
            found_imgs_ids.push(images_routes[i]['id']);
        }

        // Forming our payload for the encoding request
        var payload = JSON.stringify({ 
            "name" : "encode", 
            "img_format" : "route",
            "imgs": img_list
        });

        // Setting configuration of the request
        var url = 'http://'+process.env.FACE_ANALYTICS_SERVER + ':' + process.env.FACE_ANALYTICS_PORT + '/encode_images';
        var config = {
            method: 'post',
            url: url,
            headers: {'Content-Type':'application/json'},
            data: payload
        };

        // Requesting to the Analytics server
        // Getting the embeddings from the request
        const response = await axios(config).then((result) =>{

            const request_response = result.data;
            request_response["success"] = true;
            return request_response;

        }).catch((error) =>{
            const request_response = ({
                "success" : false,
                "error" : error
            });

            return request_response;
        });
        var update_response;

        // IF the request from the videoanalytics server was successful, continue
        if(response["success"] == true){

            update_response = [];
            // Saving the embedding code of the images on the DB for each image
            for(let j=0;j<found_imgs_ids.length;j++){

                // TODO: Consider if the best way to store the codes is as TEXT of is there a better way.
                // Queries the DB for each image to save the embedding and returns the result
                let query_result = await images.update({
                    coder: response["embeddings"][j]["embedding"].toString(),
                    is_encoded: 1                
                },{
                    where: {id: found_imgs_ids[j]}
                }).then(() => {
                    const query_response = ({
                        "id" : found_imgs_ids[j],
                        "result" : "success"
                    });
                    return query_response;
                }).catch((error) =>{
                    const query_response = ({
                        "id" : found_imgs_ids[j],
                        "result" : "failed",
                        "error" : error
                    });
                    return query_response;
                });

                // Stacks the response of the queries
                update_response.push(query_result);
            }
        }else{
            update_response = ({
                "success" : false,
                "result" : "Failed to get a request from the server",
                "error" : response["error"]
            });
        }

        res.json( update_response );
    } catch (e) {
        console.log(e);
        res.status(500).log("There was an error ")
    }
}