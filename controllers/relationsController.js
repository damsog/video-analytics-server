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

// Query to Update group-profile relation for a profile that needs to be re-added to embedding file
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

// Query to Update group-profile relation for a group where all profiles were just added to an embedding file
exports.setCodesAdded = async (groupId) => {
    try {
        const response = await relations.update({
            codes_added: true
        },{
            where: {profileGroupId: groupId}
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

// Query to count how many profiles have codes yet to be added to the group file
exports.countCodesAddToGroup = async (groupId) => {
    try {
        const response = relations.count({
            where: {
                codes_added: 0,
                profileGroupId: groupId
            }
        }).then((count) => {
            return count;
        }).catch((error) => {
            return error;
        });

        return response;
    } catch (e) {
        console.log(e);
        return e;
    }
}