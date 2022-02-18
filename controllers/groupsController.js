const groups = require("../models/groups");
const logger = require('../lib/logger');
const colorText = require('../lib/colortext');

// Controller to create a new group
exports.createGroup = async (req,res) => {
    try {
        const response = await groups.create({
                name: req.body.name,
                dataset_route: req.body.dataset_route,
                userId: req.body.userId
        }).then((data) => {
            const res = {
                success: true,
                message: "Query executed successfully",
                data: data
            }

            return res;
        }).catch((error) => {
            const res = { success: false, error:error}
        });

        logger.info( colorText( "GROUPS CONTROLLER: create group success " ) );
        logger.debug( colorText( `GROUPS CONTROLLER: create group result: ${response}` ) );
        res.json(response);
    } catch (e) {
        logger.error( colorText( "GROUPS CONTROLLER: create group error" ) );
        logger.error( colorText( e ) );
        res.status(500).send("There as an error");
    }
}

// Controller to get a list of all groups
exports.getAllGroups = async (req,res) => {
    try {
        const response = await groups.findAll().then((data) => {
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

        logger.info( colorText( "GROUPS CONTROLLER: get all groups success " ) );
        logger.debug( colorText( `GROUPS CONTROLLER: get all groups result: ${response}` ) );
        res.json(response);
    } catch (e) {
        logger.error( colorText( "GROUPS CONTROLLER: get all groups error" ) );
        logger.error( colorText( e ) );
        res.status(500).send("There was an error ")
    }
}

// Controller to get a group info given an id
// TODO: UPdate this function to call the query instead
exports.getGroupById = async (req,res) => {
    try {
        const response = await groups.findByPk(req.params.id).then((data) => {
            const res = {
                success: true,
                message: "Query executed successfully",
                data: data
            }
            return res;
        }).catch((error) => {
            const res = { success:false, error: error}
            return res;
        });

        logger.info( colorText( "GROUPS CONTROLLER: get group by id success " ) );
        logger.debug( colorText( `GROUPS CONTROLLER: get group by id result: ${response}` ) );
        res.json(response);
    } catch (e) {
        logger.error( colorText( "GROUPS CONTROLLER: get group by id error" ) );
        logger.error( colorText( e ) );
        res.status(500).send("There was an error ")
    }
}

// Controller to update a profile info
// TODO: UPdate this function to call the query instead
exports.updateGroupById = async (req,res) => {
    try {
        const { name, dataset_route, userId } = req.body;
        const response = await groups.update({
            fullname: name,
            dataset_route: dataset_route,
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
        });

        logger.info( colorText( "GROUPS CONTROLLER: update group by id success" ) );
        logger.debug( colorText( `GROUPS CONTROLLER: update group by id result: ${response}` ) );
        res.json(response);
    } catch (e) {
        logger.error( colorText( "GROUPS CONTROLLER: update group by id error " ) );
        logger.error( colorText( e ) );
        res.status(500).send("There was an error ")
    }
}

// Controller to destroy a group given an id
exports.deleteGroupById = async (req,res) => {
    try {
        const response = await groups.destroy({
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

        logger.info( colorText( "GROUPS CONTROLLER: delete group by id success " ) );
        logger.debug( colorText( `GROUPS CONTROLLER: delete group by id result: ${response}` ) );
        res.json(response);
    } catch (e) {
        logger.error( colorText( "GROUPS CONTROLLER: delete group by id error " ) );
        logger.error( colorText( e ) );
        res.status(500).send("There was an error ")
    }
}

// Controller to get the list of groups that belong to a user
exports.getGroupsByUserId = async (req,res) => {
    try {
        const response = await groups.findAll({
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
        });

        logger.info( colorText( "GROUPS CONTROLLER: get groups by userid success " ) );
        logger.debug( colorText( `GROUPS CONTROLLER: get groups by userid result: ${response}` ) );
        res.json(response);
    } catch (e) {
        logger.error( colorText( "GROUPS CONTROLLER: get groups by userid error" ) );
        logger.error( colorText( e ) );
        res.status(500).send("There was an error ")
    }
}

// Query to update a group info
exports.updateGroupByIdQ = async (name, dataset_route, userId, groupId) => {
    try {
        const response = await groups.update({
            fullname: name,
            dataset_route: dataset_route,
            userId: userId
        }, {
            where: {id: groupId }
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
        });

        logger.info( colorText( "GROUPS CONTROLLER: update group by id query success" ) );
        logger.debug( colorText( `GROUPS CONTROLLER: update group by id query result: ${response}` ) );
        return response;
    } catch (e) {
        logger.error( colorText( "GROUPS CONTROLLER: update group by id query error " ) );
        logger.error( colorText( e ) );
        return e;
    }
}

// Query to get a group info given an id
exports.getGroupByIdQ = async (groupId) => {
    try {
        const response = await groups.findByPk(groupId).then((data) => {
            const res = {
                success: true,
                message: "Query executed successfully",
                data: data
            }
            return res;
        }).catch((error) => {
            const res = { success:false, error: error}
            return res;
        });

        logger.info( colorText( "GROUPS CONTROLLER: get group by id query success " ) );
        logger.debug( colorText( `GROUPS CONTROLLER: get group by id query result: ${response}` ) );
        return response;
    } catch (e) {
        logger.error( colorText( "GROUPS CONTROLLER: get group by id query error " ) );
        logger.error( colorText( e ) );
        return e;
    }
}
