require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
require("./models/users");
require('./models/profiles');
require('./models/groups');
require('./models/coders');
require('./models/relations');
require('./models/permits');
require("./models/associations");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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

// settigs

app.set('port', process.env.PORT || 4000);


app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // swagger route


// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Global Variables

// Routes
app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/profiles', require('./routes/profilesRoutes'));
app.use('/api/groups', require('./routes/groupsRoutes'));
app.use('/api/coders', require('./routes/codersRoutes'));

// Run the server
app.listen(app.get('port'), () => {
    console.log("Server running on port ", app.get('port'));
});