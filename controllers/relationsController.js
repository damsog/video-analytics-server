const relations = require('../models/relations');

const logger = require('../lib/logger');
const colorText = require('../lib/colortext');

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
        
        logger.info( colorText( "RELATIONS CONTROLLER: create relation success" ) );
        logger.debug( colorText( `RELATIONS CONTROLLER: create relation result: ${response}` ) );
        res.json(response);
    } catch (e) {
        logger.error( colorText( "RELATIONS CONTROLLER: create relation error " ) );
        logger.error( colorText( e ) );
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

        logger.info( colorText( "RELATIONS CONTROLLER: get profiles by group success" ) );
        logger.debug( colorText( `RELATIONS CONTROLLER: get profiles by group result: ${response}` ) );
        res.json(response);
    } catch (e) {
        logger.error( colorText( "RELATIONS CONTROLLER: get profiles by group error " ) );
        logger.error( colorText( e ) );
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

        logger.info( colorText( "RELATIONS CONTROLLER: get groups by profile success" ) );
        logger.debug( colorText( `RELATIONS CONTROLLER: get groups by profile result: ${response}` ) );
        res.json(response);
    } catch (e) {
        logger.error( colorText( "RELATIONS CONTROLLER: get groups by profile error " ) );
        logger.error( colorText( e ) );
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
        
        logger.info( colorText( "RELATIONS CONTROLLER: delete relation success" ) );
        logger.debug( colorText( `RELATIONS CONTROLLER: delete relation result: ${response}` ) );
        res.json(response);
    } catch (e) {
        logger.error( colorText( "RELATIONS CONTROLLER: delete relation error " ) );
        logger.error( colorText( e ) );
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

        logger.info( colorText( "RELATIONS CONTROLLER: reset code added success" ) );
        logger.debug( colorText( `RELATIONS CONTROLLER: reset code added result: ${response}` ) );
        return response;
    } catch (e) {
        logger.error( colorText( "RELATIONS CONTROLLER: reset code added error " ) );
        logger.error( colorText( e ) );
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

        logger.info( colorText( "RELATIONS CONTROLLER: set codes added success" ) );
        logger.debug( colorText( `RELATIONS CONTROLLER: set codes added result: ${response}` ) );
        return response;
    } catch (e) {
        logger.error( colorText( "RELATIONS CONTROLLER: set codes added error " ) );
        logger.error( colorText( e ) );
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

        logger.info( colorText( "RELATIONS CONTROLLER: count codes to add to group success" ) );
        logger.debug( colorText( `RELATIONS CONTROLLER: count codes to add to group result: ${response}` ) );
        return response;
    } catch (e) {
        logger.error( colorText( "RELATIONS CONTROLLER: count codes to add to group error " ) );
        logger.error( colorText( e ) );
        return e;
    }
}