/**
 * @author Felipe Serna
 * @email damsog38@gmail.com
 * @create date 2021-14-06 20:01:10
 * @modify date 2022-02-13 14:19:39
 * @desc Backend engine that server a a list of functionalities to connect and control to a 
 * python  engine that allows to run live face detection and face recognition (or by single image).
 * And using said algorithms offers other more specific solutions to the user.
 */

/************************************************************************************************
 *                                             Dependencies
*************************************************************************************************/
// Configuration Constants & Global Variables
require('dotenv').config()

// Basic Express Dependencies
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

// Models, Personal Libraries & Services
require("./models/users");
require('./models/profiles');
require('./models/groups');
require('./models/images');
require('./models/relations');
require('./models/permits');
require("./models/associations");
const auth = require("./lib/auth");
const customMorgan = require("./lib/customMorgan");

// Documentation Dependencies
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Logging, Terminal Styles & Colors Dependencies
const chalk = require('chalk');
//const chalkAnimation = require('chalk-animation');
const gradient = require('gradient-string');
const figlet = require('figlet');
const logger = require('./lib/logger');
const colorText = require('./lib/colortext');


/************************************************************************************************
 *                                           Configurations
*************************************************************************************************/

// Swagger Documentation confifguration
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Platform API',
            version: "1.0.0",
            description: 'Videoanalytics platform API'
        },
        servers: [
            {
                url: "http://localhost:4000"
           }
        ]
    },
    apis: ["./routes/*.js"]
}
// Swagger Documentation initialization
const swaggerDocs = swaggerJsDoc(swaggerOptions);
const app = express();

// Figlet Configuration. To display a cool title for the Server.
const figletParamsTitle = {
    font: "Isometric2",
    horizontalLayout: 'full',
    verticalLayout: 'full',
    width: 100,
    whitespaceBreak: false
}
const figletParamsSubtitle = {
    font: "Alligator2",
    horizontalLayout: 'fitted',
    verticalLayout: 'fitted',
    width: 200,
    whitespaceBreak: true
}

// Creating some required folders to store users resources (Pictures, and groups)
if (!fs.existsSync(process.env.RESOURCES_PATH)) {
    fs.mkdirSync(process.env.RESOURCES_PATH, { recursive: true});
    logger.info( colorText( "Resource Created on: " + process.env.RESOURCES_PATH) );
}

// General Server settigs
app.set('port', process.env.PORT || 4000);
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // swagger route


// Middlewares Used
app.use(cors());
//app.use(morgan('[:date[iso]] : : :method : : :url : : HTTP/:http-version : : :status', {"stream": logger.stream.write}));
app.use(customMorgan);
app.use(express.urlencoded({extended: false}));
app.use(express.json({limit: '50mb'}));

// Routes
app.use('/api/login', require('./routes/login'));
app.use('/api/users', auth, require('./routes/usersRoutes'));
app.use('/api/profiles', auth, require('./routes/profilesRoutes'));
app.use('/api/groups', auth, require('./routes/groupsRoutes'));
app.use('/api/images', auth, require('./routes/imagesRoutes'));
app.use('/api/relations', auth, require('./routes/relationsRoutes'));
app.use('/api/process', auth, require('./routes/processesRoutes'));

// FrontEnd. Serving Frontend files as static public files
app.use(express.static('public/dist'));

// Serving frontend routes
app.get('/*', (req, res) => { 
    res.sendFile(path.join(__dirname, 'public/dist', 'index.html')); 
});


/************************************************************************************************
 *                                             Running
*************************************************************************************************/
app.listen(app.get('port'), () => {

    // Sick title
    console.log( 
        gradient.retro(
            figlet.textSync("Gnosis", figletParamsTitle)
        )
    );
    // Cool subtitle
    console.log( 
        gradient.retro(
            figlet.textSync("Central Server", figletParamsSubtitle)
        )
    );  
    logger.info( colorText( "SERVER CONFIG INFO: Resources folder resides on: " + process.env.RESOURCES_PATH) );
    logger.info( colorText( "SERVER CONFIG INFO: Server Address : " + process.env.SERVER) );
    logger.info( colorText( "SERVER CONFIG INFO: Server running on port: " + process.env.PORT) );
    logger.info( colorText( "SERVER CONFIG INFO: Connecting to Face Analytics server on : " + process.env.FACE_ANALYTICS_SERVER) );
    logger.info( colorText( "SERVER CONFIG INFO: Connecting to Face Analytics server on port :" + process.env.FACE_ANALYTICS_PORT) );
});