require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
require("../models/users");
require('../models/profiles');
require('../models/groups');
require('../models/coders');
require('../models/relations');
require('../models/permits');
require("../models/associations");
// initializations
const app = express();

// settigs
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Global Variables

// Routes


// Run the server
app.listen(app.get('port'), () => {
    console.log("Server running on port ", app.get('port'));
});