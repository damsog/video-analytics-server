require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
require("./models/users");
require('./models/profiles');
require('./models/groups');
require('./models/images');
require('./models/relations');
require('./models/permits');
require("./models/associations");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const auth = require("./lib/auth");

// SwaggerDoc condifguration
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


// initializations
const swaggerDocs = swaggerJsDoc(swaggerOptions);
const app = express();

// Creating some required folders
if (!fs.existsSync(process.env.RESOURCES_PATH)) {
    fs.mkdirSync(process.env.RESOURCES_PATH, { recursive: true});
    console.log("Resource Created on: " + process.env.RESOURCES_PATH);
}

// settigs
app.set('port', process.env.PORT || 4000);
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // swagger route


// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Global Variables

// Routes
app.use('/api/login', require('./routes/login'));
app.use('/api/users', auth, require('./routes/usersRoutes'));
app.use('/api/profiles', auth, require('./routes/profilesRoutes'));
app.use('/api/groups', auth, require('./routes/groupsRoutes'));
app.use('/api/images', auth, require('./routes/imagesRoutes'));
app.use('/api/relations', auth, require('./routes/relationsRoutes'));
app.use('/api/process', auth, require('./routes/processesRoutes'));


// Run the server
app.listen(app.get('port'), () => {
    console.log("SERVER INFO: Resources folder resides on: " + process.env.RESOURCES_PATH);
    console.log("SERVER INFO: Server running on port: ", app.get('port'));
});