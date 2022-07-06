const utils = require("../lib/utils");
const users = require("../models/users");
const jwt = require('jsonwebtoken');

const logger = require('../lib/logger');
const colorText = require('../lib/colortext');

// controller to get the list of all users from the database
exports.getAllUsers = async (req, res) => {
    try {
        const allusers = await users.findAll().then((data) => {
            const res = {
                success: true,
                message: "Users list retrieved",
                data: data
            }
            return res;
        }).catch(error => {
            const res = {success: false, error: error}
            return res;
        });
        
        logger.info( colorText( "USER CONTROLLER: get all users success" ) );
        logger.debug( colorText( `USER CONTROLLER: get all users result: ${allusers}` ) );
        res.json(allusers);
    } catch (e) {
        logger.error( colorText( "USER CONTROLLER: get all users error " ) );
        logger.error( colorText( e ) );
        res.status(500).send("There was an error getting user information");
    }
}

// Gets a user field that matches the id
exports.getUserById = async (req,res) => {
    try {
        const user = await users.findByPk(req.params.id).then((data)=>{
            const res = {
                success: true,
                message: "Query executed without problems",
                data: data
            }
            return res;
        }).catch(error =>{
            const res = {success: false, error: error}
            return res;
        });

        logger.info( colorText( "USER CONTROLLER: get user by id success" ) );
        logger.debug( colorText( `USER CONTROLLER: get user by id result: ${user}` ) );
        res.json(user);
    } catch (e) {
        logger.error( colorText( "USER CONTROLLER: get user by id error " ) );
        logger.error( colorText( e ) );
        res.status(500).send("There was an error getting user information");
    }
}

// Updates fields from a row on the users database given an id
exports.updateUserById = async (req, res) => {
    try {
        const { username, password, fullname, nick, logo } = req.body;

        const response = await users.update({
            username: username,
            password: password,
            fullname:fullname,
            nick: nick,
            logo: logo
        }, {
            where: {id: req.params.id}
        }).then((data) => {
            const res = {
                success: true,
                message: "Query executed succesfully",
                result: data
            }
            return res;
        }).catch((error) =>{
            const res = {success: false, error: error}
            return res;
        });
        
        logger.info( colorText( "USER CONTROLLER: update user by id success" ) );
        logger.debug( colorText( `USER CONTROLLER: update user by id result: ${response}` ) );
        res.json(response);
    } catch (e) {
        logger.error( colorText( "USER CONTROLLER: update user by id error " ) );
        logger.error( colorText( e ) );
        res.status(500).send("There was an error getting user information");
    }
}

// Deletes a field on the users table given an id
exports.deleteUserById = async (req,res) => {
    try {
        const response = await users.destroy({
            where: {id: req.params.id}
        }).then((data) => {
            const res = {
                success: true,
                message: "Query executed successfully",
                result: data
            }
            return res;
        }).catch((error) => {
            const res = {success: false, error: error}
            return res;
        })

        logger.info( colorText( "USER CONTROLLER: delete user by id success" ) );
        logger.debug( colorText( `USER CONTROLLER: delete user by id result: ${response}` ) );
        res.json(response);
    } catch (e) {
        logger.error( colorText( "USER CONTROLLER: delete user by id error " ) );
        logger.error( colorText( e ) );
        res.status(500).send("There was an error getting user information");
    }
}