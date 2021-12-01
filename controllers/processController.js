const { countCodesAddToGroup } = require('./relationsController');
const { imgsToEncodeGroup, encodeImages, getCodesForGroup } = require('./imagesController')

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
        const autoEncode = false;
        var dataArray = []
        if(imgs.length <= 0){
            // TODO: Parse Data and store it

            var codesjson = await getCodesForGroup(req.body.groupId);
            for(let i=0;i<codesjson.length;i++){
                dataArray.push([ codesjson[i]["profile"]["id"], codesjson[i]["coder"] ])
            }

            response = {
                "success" : true,
                "message" : "Processing images",
                "data" : dataArray
            }
        }else{
            if(autoEncode){
                // TODO: If autoencode. Request to encode images that still need encodding.
                // or just repsonse informing.
                res.data.imgs = imgs;

                // TODO: Needs to work as a internal function
                //const encodeResponse = await encodeImages(req,res);

                response = {
                    "success" : false,
                    "message" : "Images needed to be encoded.",
                    "data" : encodeResponse
                }
            }else{
                response = {
                    "success" : false,
                    "message" : "Images that still need to be encoded for this group",
                    "data" : imgs
                }
            }
        }

        res.json(response);
    } catch (e) {
        console.log(e);
        res.status(500).log("There was an error ");
    }
}