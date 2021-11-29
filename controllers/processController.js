const { countCodesAddToGroup } = require('./relationsController');
const { imgsToEncodeGroup } = require('./imagesController')

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
            // TODO: Process the Dataa and make the request to python API
            response = {
                "success" : true,
                "message" : "img will be processed"
            }
        }

        res.json(response);
    } catch (e) {
        console.log(e);
        res.status(500).log("There was an error ");
    }
}

exports.reloadCodesToGroup = async (req, res) => {
    try {
        var imgs = await imgsToEncodeGroup(req.body.groupId);
        var response;
        if(!imgs){
            // TODO: Query get Embeddings
            // TODO: Parse Data and store it
            response = {
                "success" : true,
                "message" : "Processing images",
                "data" : imgs
            }
        }else{
            // TODO: If autoencode. Request to encode images that still need encodding.
            // or just repsonse informing.
            response = {
                "success" : false,
                "message" : "Images that still need to be encoded for this group",
                "data" : imgs
            }
        }

        res.json(response);
    } catch (e) {
        console.log(e);
        res.status(500).log("There was an error ");
    }
}