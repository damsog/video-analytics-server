const images = require('../models/images');
const multer = require('multer');
const fs = require('fs');

// Setting multer for uploading files
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './resources/user_data/' + req.params.username + '/' + req.params.profilename);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

// describing the file to upload. set limits and restrictions
// 1gb files max
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 10
    }
});

exports.saveImage = (req, res, next) => {
    console.log("Uploading image to profile " + req.params.profilename);
    var dir = './resources/user_data/' + req.params.username + '/' + req.params.profilename ;
    
    try {
        var response = { success : true };
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true});
            response['details'] = " Resource Just created";
        }
        upload.single('profilePicture')(req, res, next);
        // TODO: query the DB updating the route for the new picture added
    
        res.json(response)
        
    } catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong');
    }

}

// Controller to create a new image registry
exports.createImageRecord = async (req,res) => {
    try {
        const response = await images.create({
            coder_img_route: req.body.coder_img_route,
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