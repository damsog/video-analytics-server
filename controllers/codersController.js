const coders = require('../models/coders');
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

exports.uploadImage = (req, res, next) => {
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

// Controller to create a new coder registry
exports.createCoder = async (req,res) => {
    try {
        const response = await coders.create({
            coder_img_route: req.body.coder_img_route,
            coder: req.body.coder,
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
        });              
        
        res.json(response);
    } catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong');
    }
}

// Controller to get a list of all coders
exports.getAllCoders = async (req,res) => {
    try {
        const response = await coders.findAll().then((data) => {
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

// Controller to get a coder info given an id
exports.getCoderById = async (req,res) => {
    try {
        const response = await coders.findByPk(req.params.id).then((data) => {
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
exports.updateCoderById = async (req,res) => {
    try {
        const { coder_img_route, coder, profileId } = req.body;
        const response = await coders.update({
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
exports.deleteCoderById = async (req,res) => {
    try {
        const response = await coders.destroy({
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
exports.getCodersByProfileId = async (req,res) => {
    try {
        const response = await coders.findAll({
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