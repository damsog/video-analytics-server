const relations = require('../models/relations');

// Controller to create an association group profile
exports.createRelation = async (req,res) => {
    try {
        const response = await relations.create({
            profileId: req.body.profileId,
            profileGroupId: req.body.groupId
        }).then((data) => {
            const res = {
                success: true,
                message: "Query executed succesfully",
                data: data
            }

            return res;
        }).catch((error) => {
            const res = { success: false, error: error }
            return res
        });
        
        res.json(response);
    } catch (e) {
        console.log(e);
        res.status(500).send("There was an error");                
    }
}

// Controller to get the profiles that belong to a group
exports.getProfilesByGroup = async (req,res) => {
    try {
        const response = await relations.findAll({
            where: {profileGroupId: req.params.groupId}
        }).then((data) => {
            const res = {
                success: true,
                message: "Query executed succesfully",
                data: data
            }

            return res;
        }).catch((error) => {
            const res = { success: false, error: error }
        });

        res.json(response)
    } catch (e) {
        console.log(e);
        res.status(500).send("There was an error");        
    }
}

// Gets all the groups a profile belongs to
exports.getGroupsByProfile = async (req,res) => {
    try {
        const response = await relations.findAll({
            where: {profileId: req.params.profileId}
        }).then((data) => {
            const res = {
                success: true,
                message: "Query executed succesfully",
                data: data
            }

            return res;
        }).catch((error) => {
            const res = { success: false, error: error }
        });

        res.json(response)
    } catch (e) {
        console.log(e);
        res.status(500).send("There was an error");        
    }
}

// Deletes a group profile association
exports.deleteRelation = async (req,res) => {
    try {
        const response = await relations.destroy({
            where: {
                profileGroupId: req.body.groupId,
                profileId: req.body.profileId
            }
        }).then((data) => {
            const res = {
                success: true,
                message: "Query executed succesfully",
                data: data
            }

            return res;
        }).catch((error) => {
            const res = { success: false, error: error }
        });
        
        res.json(response);
    } catch (e) {
        console.log(e);
        res.status(500).send("There was an error");                
    }
}

exports.resetCodeAdded = async (profileId) => {
    try {
        const response = await relations.update({
            codes_added: false
        },{
            where: {profileId: profileId}
        }).then((res) =>{
            return res;
        }).catch((error) => {
            return error;
        });

        return response;
    } catch (e) {
        console.log(e);
        return e;
    }
}