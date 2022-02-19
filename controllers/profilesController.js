const profiles = require("../models/profiles");

const logger = require('../lib/logger');
const colorText = require('../lib/colortext');

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

        logger.info( colorText( "PROFILES CONTROLLER: create profile success" ) );
        logger.debug( colorText( `PROFILES CONTROLLER: create profile result: ${response}` ) );
        res.json(response);
    } catch (e) {
        logger.error( colorText( "PROFILES CONTROLLER: create profile error " ) );
        logger.error( colorText( e ) );
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

        logger.info( colorText( "PROFILES CONTROLLER: get all profiles success" ) );
        logger.debug( colorText( `PROFILES CONTROLLER: get all profiles result: ${response}` ) );
        res.json(response);
    } catch (e) {
        logger.error( colorText( "PROFILES CONTROLLER: get all profiles error " ) );
        logger.error( colorText( e ) );
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
        });

        logger.info( colorText( "PROFILES CONTROLLER: get profile by id success" ) );
        logger.debug( colorText( `PROFILES CONTROLLER: get profile by id result: ${response}` ) );
        res.json(response);
    } catch (e) {
        logger.error( colorText( "PROFILES CONTROLLER: get profile by id error " ) );
        logger.error( colorText( e ) );
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

        logger.info( colorText( "PROFILES CONTROLLER: update profile by id success" ) );
        logger.debug( colorText( `PROFILES CONTROLLER: update profile by id result: ${response}` ) );
        res.json(response);
    } catch (e) {
        logger.error( colorText( "PROFILES CONTROLLER: update profile by id error " ) );
        logger.error( colorText( e ) );
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

        logger.info( colorText( "PROFILES CONTROLLER: delete profile by id success" ) );
        logger.debug( colorText( `PROFILES CONTROLLER: delete profile by id result: ${response}` ) );
        res.json(response);
    } catch (e) {
        logger.error( colorText( "PROFILES CONTROLLER: delete profile by id error " ) );
        logger.error( colorText( e ) );
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
        });

        logger.info( colorText( "PROFILES CONTROLLER: get profiles by user id success" ) );
        logger.debug( colorText( `PROFILES CONTROLLER: get profiles by user id result: ${response}` ) );
        res.json(response);
    } catch (e) {
        logger.error( colorText( "PROFILES CONTROLLER: get profiles by user id error " ) );
        logger.error( colorText( e ) );
        res.status(500).send("There was an error ")
    }
}