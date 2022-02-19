const utils = require("../lib/utils");
const users = require("../models/users");
const jwt = require('jsonwebtoken');

const logger = require('../lib/logger');
const colorText = require('../lib/colortext');

// controller to create a new user
exports.createUser = async (req,res) => {
    try {
        const { username, password, fullname, nick, logo } = req.body;

        // validates if username and password are not empty
        if(!(username && password)){
            res.status(400).send("At least username and password are required");
        }

        // Validates if the username is aleady in use
        const olduser = await users.findOne({where: {username: username }});
        if (olduser) {
            return res.status(409).send("Username is already in use ");
        }

        // Encrypting password
        const encryptedPassword = await utils.encryptPassword(password);
        console.log(password, encryptedPassword);

        // Creating user
        const response = await users.create({
            username: username,
            password: encryptedPassword,
            fullname: fullname,
            nick: nick,
            logo: logo
            
        }).then(function(data){
            const res = {
                success: true,
                message: "User created successfully",
                data: data
            }
            return res;
        }).catch(error=>{
            const res = { success: false, error: error}
            return res;
        });

        // Creating access token
        const token = jwt.sign(
            { user_id: response.data.id, username },
            process.env.TOKEN_KEY,
            { expiresIn: "60000"}
        );
        response.token = token;

        logger.info( colorText( "USER CONTROLLER: create user success" ) );
        logger.debug( colorText( `USER CONTROLLER: create user result: ${response}` ) );
        res.json(response);
    } catch (e) {
        logger.error( colorText( "USER CONTROLLER: create user error " ) );
        logger.error( colorText( e ) );
        res.status(500).send("There was an error");
    }
}

// User Login
exports.getAccess = async (req,res) => {
    try {
        const { username, password } = req.body;

        // Validates if username and password were given
        if(!( username && password )) {
            return res.status(400).send("Username and password are required");
        }

        // Validates if user exists
        const user = await users.findOne({where: {username: username}});

        if(user && (await utils.matchedPassword(password, user.password) )){

            // With access given, we create a token
            const token = jwt.sign(
                { user_id: user.id, username },
                process.env.TOKEN_KEY,
                {expiresIn: "1h"}
            );

            // Adds token to the response
            user.dataValues.token = token;

            logger.info( colorText( "USER CONTROLLER: login success " ) );
            res.status(200).json(user);
        }else{
            logger.info( colorText( "USER CONTROLLER: login error wrong credentials " ) );
            res.status(400).send("Invalid Credentials");
        }
    } catch (e) {
        logger.error( colorText( "USER CONTROLLER: login error " ) );
        logger.error( colorText( e ) );
        res.status(500).send("There was an error");
    }
}

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