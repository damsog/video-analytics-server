const users = require("../models/users");

// controller to create a new user
exports.createUser = async (req,res) => {
    try {
        const response = await users.create({
            username: req.body.username,
            password: req.body.password,
            
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