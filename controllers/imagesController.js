const images = require('../models/images');
const multer = require('multer');
const fs = require('fs');

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
                coder_img_route: req.file.path,
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