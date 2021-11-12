const groups = require("../models/groups");

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

        res.json(response);
    } catch (e) {
        console.log(e);
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

        res.json(response);
    } catch (e) {
        console.log(e);
        res.status(500).log("There was an error ")
    }
}

// Controller to get a group info given an id
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
        })
        res.json(response);
    } catch (e) {
        console.log(e);
        res.status(500).log("There was an error ")
    }
}

// Controller to update a profile info
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
        })

        res.json(response);
    } catch (e) {
        console.log(e);
        res.status(500).log("There was an error ")
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

        res.json(response);
    } catch (e) {
        console.log(e);
        res.status(500).log("There was an error ")
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
        })
        res.json(response);
    } catch (e) {
        console.log(e);
        res.status(500).log("There was an error ")
    }
}
