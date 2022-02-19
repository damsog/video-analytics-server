const { countCodesAddToGroup, setCodesAdded } = require('./relationsController');
const { imgsToEncodeGroup, getCodesForGroup } = require('./imagesController')
const { getGroupByIdQ, updateGroupByIdQ } = require('./groupsController');
const fs = require('fs');
const axios = require('axios');

const logger = require('../lib/logger');
const colorText = require('../lib/colortext');

exports.processAnalyzeImg = async (req,res) => {
    try {
        const countCodesToAdd = await countCodesAddToGroup(req.body.groupId);
        var mserver_response;
        if(countCodesToAdd != 0){
            mserver_response = {
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

            // Requesting to the Face Analytics server
            // Getting response of an image
            const faserver_response = await axios(config).then((result) =>{
                const faserver_response = result.data;
                faserver_response["success"] = true;
                return faserver_response;

            }).catch((error) =>{
                const faserver_response = ({
                    "success" : false,
                    "error" : error
                });

                return faserver_response;
            });

            mserver_response = {
                "success" : true,
                "message" : "img processed",
                "faserver_response" : faserver_response
            }
        }

        
        logger.info( colorText( "PROCESS CONTROLLER: porcess analyze image success" ) );
        logger.debug( colorText( `PROCESS CONTROLLER: porcess analyze image result: ${mserver_response}` ) );
        res.json(mserver_response);
    } catch (e) {
        logger.error( colorText( "GROUPS CONTROLLER: porcess analyze image error " ) );
        logger.error( colorText( e ) );
        res.status(500).send("There was an error ");
    }
}

exports.processDetectImg = async (req,res) => {
    try {
        var mserver_response;

        // Json structure to send
        var payload = JSON.stringify({
            "img" : req.body.img,
            "return_img" : req.body.return_img
        });

        // Axios configs for the request
        url = `http://${process.env.FACE_ANALYTICS_SERVER}:${process.env.FACE_ANALYTICS_PORT}/detect_image`;
        var config = {
            method: 'post',
            url: url,
            headers: {'Content-Type':'application/json'},
            data : payload
        };
        
        // Requesting Face detection to the Face Analytics server
        const faserver_response = await axios(config).then((result) =>{
            const faserver_response = result.data;
            faserver_response["success"] = true;
            return faserver_response;
        }).catch((error) =>{
            const faserver_response = ({
                "success" : false,
                "error" : error
            });

            return faserver_response;
        });

        mserver_response = {
            "success" : true,
            "message" : "img processed",
            "faserver_response" : faserver_response
        }
        
        logger.info( colorText( "PROCESS CONTROLLER: process detect image success" ) );
        logger.debug( colorText( `PROCESS CONTROLLER: process detect image result: ${mserver_response}` ) );
        res.json(mserver_response);
    } catch (e) {
        logger.error( colorText( "GROUPS CONTROLLER: process detect image error " ) );
        logger.error( colorText( e ) );
        res.status(500).log("There was an error");
    }
}

exports.reloadCodesToGroup = async (req, res) => {
    try {
        const groupId = req.body.groupId;
        var imgs = await imgsToEncodeGroup(groupId);
        const groupPath = `${process.env.RESOURCES_PATH}user_data/${req.user.user_id}/g${groupId}/`;
        var mserver_response;
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

            mserver_response = {
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

                mserver_response = {
                    "success" : false,
                    "message" : "Images needed to be encoded.",
                    "data" : encodeResponse
                }
            }else{
                mserver_response = {
                    "success" : false,
                    "message" : "Images that still need to be encoded for this group",
                    "data" : imgs
                }
            }
        }

        logger.info( colorText( "PROCESS CONTROLLER: reload codes success" ) );
        logger.debug( colorText( `PROCESS CONTROLLER: reload codes result: ${mserver_response}` ) );
        res.json(mserver_response);
    } catch (e) {
        logger.error( colorText( "GROUPS CONTROLLER: reload codes error " ) );
        logger.error( colorText( e ) );
        res.status(500).send("There was an error ");
    }
}

exports.faceDetectionStream = async (req, res) => {
    try{
        var mserver_response;
        //TODO Work as a signaling server. Receive
        // Forming our payload for the encoding request
        var payload = JSON.stringify({ 
            "sdp" : req.body.sdp, 
            "type" : req.body.type
        });

        // Setting configuration of the request
        var url = `http://${process.env.FACE_ANALYTICS_SERVER}:${process.env.FACE_ANALYTICS_PORT}/facedet_stream`;
        var config = {
            method: 'post',
            url: url,
            headers: {'Content-Type':'application/json'},
            data: payload
        };

        // Requesting to the Analytics server
        // Getting response for the signaling
        const faserver_response = await axios(config).then((result) =>{
            let faserver_response = result.data;
            faserver_response["success"] = true;
            return faserver_response;

        }).catch((error) =>{
            const faserver_response = ({
                "success" : false,
                "error" : error
            });

            return faserver_response;
        });

        mserver_response = {
            "sdp" : faserver_response.sdp,
            "type" : faserver_response.type
        }

        //console.log(response);

        logger.info( colorText( "PROCESS CONTROLLER: face detection stream success" ) );
        logger.debug( colorText( `PROCESS CONTROLLER: face detection stream result: ${mserver_response}` ) );
        res.json(mserver_response);
    } catch (e) {
        logger.error( colorText( "GROUPS CONTROLLER: face detection stream stream " ) );
        logger.error( colorText( e ) );
        res.status(500).send("There was an error ");
    }
}

exports.faceRecognitionStream = async (req, res) => {
    try{
        var mserver_response;
        //TODO Work as a signaling server. Receive
        // Queries to get the info about the group and get its dataset_path
        const group_data = await getGroupByIdQ(req.body.group_id)

        // Forming our payload for the encoding request
        var payload = JSON.stringify({ 
            "sdp" : req.body.sdp, 
            "type" : req.body.type,
            "dataset_path" : group_data["data"]["dataset_route"]
        });

        // Setting configuration of the request
        var url = `http://${process.env.FACE_ANALYTICS_SERVER}:${process.env.FACE_ANALYTICS_PORT}/facerek_stream`;
        var config = {
            method: 'post',
            url: url,
            headers: {'Content-Type':'application/json'},
            data: payload
        };

        // Requesting to the Analytics server
        // Getting response for the signaling
        const faserver_response = await axios(config).then((result) =>{
            let faserver_response = result.data;
            faserver_response["success"] = true;
            return faserver_response;

        }).catch((error) =>{
            const faserver_response = ({
                "success" : false,
                "error" : error
            });

            return faserver_response;
        });

        mserver_response = {
            "sdp" : faserver_response.sdp,
            "type" : faserver_response.type
        }

        //console.log(response);

        logger.info( colorText( "PROCESS CONTROLLER: face recognition stream  success" ) );
        logger.debug( colorText( `PROCESS CONTROLLER: face recognition stream  result: ${mserver_response}` ) );
        res.json(mserver_response);
    } catch (e) {
        logger.error( colorText( "GROUPS CONTROLLER: face recognition stream  " ) );
        logger.error( colorText( e ) );
        res.status(500).send("There was an error ");
    }
}