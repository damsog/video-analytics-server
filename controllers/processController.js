const { countCodesAddToGroup } = require('./relationsController');

exports.processSingleImg = async (req,res) => {
    try {
        const countCodesToAdd = await countCodesAddToGroup(req.body.groupId);
        var response;
        if(countCodesToAdd != 0){
            response = {
                "success" : false,
                "message" : "There are codes required to be added to the group. please request reloading the codes for this group",
                "data" : countCodesToAdd
            }
        }else{
            response = {
                "success" : true,
                "message" : "img will be processed"
            }
        }

        res.json(response);
    } catch (e) {
        console.log(e);
        res.status(500).log("There was an error ")
    }
}