const { countCodesAddToGroup, setCodesAdded } = require('./relationsController');
const { imgsToEncodeGroup, getCodesForGroup } = require('./imagesController')
const { getGroupByIdQ, updateGroupByIdQ } = require('./groupsController');
const fs = require('fs');
const axios = require('axios');

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
            // TODO: Finish with the complete set of options to request. ie. landmarks, bboxes, etc
            
            // Query to get the path to the group coder file
            let group_data = await getGroupByIdQ(req.body.groupId);

            // Forming our payload for the encoding request
            var payload = JSON.stringify({ 
                "name" : group_data["data"]["name"], 
                "dataset_path" : group_data["data"]["dataset_route"],
                "img": req.body.img,
                "return_img" : req.body.return_img
            });

            // Setting configuration of the request
            var url = `http://${process.env.FACE_ANALYTICS_SERVER}:${process.env.FACE_ANALYTICS_PORT}/analyze_image`;
            var config = {
                method: 'post',
                url: url,
                headers: {'Content-Type':'application/json'},
                data: payload
            };

            // Requesting to the Analytics server
            // Getting response of an image
            const request_response = await axios(config).then((result) =>{
                const request_response = result.data;
                request_response["success"] = true;
                return request_response;

            }).catch((error) =>{
                const request_response = ({
                    "success" : false,
                    "error" : error
                });

                return request_response;
            });

            response = {
                "success" : true,
                "message" : "img will be processed",
                "data" : request_response
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
        const groupId = req.body.groupId;
        var imgs = await imgsToEncodeGroup(groupId);
        const groupPath = `${process.env.RESOURCES_PATH}user_data/${req.user.user_id}/g${groupId}/`;
        var response;
        const autoEncode = false;
        var dataArray = []
        
        if(imgs.length <= 0){
            // TODO: Parse Data and store it
            // Gettings all image codes for a group
            var codesjson = await getCodesForGroup(groupId);

            // Compile all the codes on an array with their respective user
            for(let i=0;i<codesjson.length;i++){
                dataArray.push([ codesjson[i]["profile"]["id"], codesjson[i]["coder"] ])
            }

            let details = {};

            // Creating the group folder if it doesn't exists
            if (!fs.existsSync(groupPath)) {
                fs.mkdirSync(groupPath, { recursive: true});
                details["Resource"] = " Resource group path just created";
            }

            // Saving the codes file
            let dataJson = JSON.stringify(dataArray, null, 2);
            let embeddingRoute = `${groupPath}g${groupId}embeddings.json`;
            let createEmbeddingFileRes = await fs.writeFile(embeddingRoute, dataJson, (err) => {
                if (err){
                    return "error";
                }else{
                    return "success";
                }
            });
            details["createEmbeddingFileResult"] = createEmbeddingFileRes;

            if(createEmbeddingFileRes="success"){
                // Now updating DB to save the codes file path and update the group-profiles relations
                let updateRelationsRes = await setCodesAdded(groupId);
                details["updateRelationResult"] = updateRelationsRes;

                let updateGroup = await updateGroupByIdQ(undefined,embeddingRoute,undefined,groupId);
                details["updateGroupResult"] = updateGroup;
            }

            response = {
                "success" : true,
                "message" : "Codes file created for group",
                "details" : details
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