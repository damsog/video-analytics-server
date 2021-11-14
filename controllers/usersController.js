const utils = require("../lib/utils");
const users = require("../models/users");
const jwt = require('jsonwebtoken');

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
            return res.status(409).send("Username is already in use");
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

        res.json(response);
    } catch (e) {
        console.log(e);
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
        
        res.json(allusers);
    } catch (e) {
        console.log(e);
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

        res.json(user);
    } catch (e) {
        console.log(e);
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
        
        res.json(response);
    } catch (e) {
        console.log(e);
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

        res.json(response);
    } catch (e) {
        console.log(e);
        res.status(500).send("There was an error getting user information");
    }
}