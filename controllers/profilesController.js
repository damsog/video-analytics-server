const profiles = require("../models/profiles");

// Controller to create a new profile associated to a user
exports.createProfile = async (req,res) => {
    try {
        const response = await profiles.create({
            fullname: req.body.fullname,
            nickname: req.body.nickname,
            userId: req.body.userId
        }).then((data) =>{
            const res = {
                success: true,
                message: "Query executed successfully",
                data: data
            }
            
            return res;
        }).catch((error) => {
            const res = { success: false, error: error}

            return res;
        });

        res.json(response);
    } catch (e) {
        console.log(e);
        res.status(500).send("There was an error ")
    }
}

// Controller to get a list of all profiles
exports.getAllProfiles = async (req,res) => {
    try {
        const response = await profiles.findAll().then((data) => {
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
        res.status(500).send("There was an error ")
    }
}

// Controller to get a profile given an id
exports.getProfileById = async (req,res) => {
    try {
        const response = await profiles.findByPk(req.params.id).then((data) => {
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
exports.updateProfileById = async (req,res) => {
    try {
        const { fullname, nickname, userId } = req.body;
        const response = await profiles.update({
            fullname: fullname,
            nickname: nickname,
            userId: userId
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
        res.status(500).send("There was an error ")
    }
}

// Controller to destroy a profile given an id
exports.deleteProfileById = async (req,res) => {
    try {
        const response = await profiles.destroy({
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
        res.status(500).send("There was an error ")
    }
}

// Controller to get a profile given an id
exports.getProfilesByUserId = async (req,res) => {
    try {
        const response = await profiles.findAll({
            where: {
                userId: req.params.userId
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
        res.status(500).send("There was an error ")
    }
}