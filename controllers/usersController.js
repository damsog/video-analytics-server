const users = require("../models/users");

exports.createUser = async (req,res) => {
    try {
        const response = await users.create({
            username: req.body.username,
            password: req.body.password
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