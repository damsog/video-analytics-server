const express = require('express');
const morgan = require('morgan');
const sequalize = require('../database/index');


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