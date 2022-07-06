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