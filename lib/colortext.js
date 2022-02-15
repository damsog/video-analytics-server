const chalk = require('chalk');

const colorText = (message) => {
    if( process.env.NODE_ENV === 'development') {
        return chalk.cyan(message);
    }else {
        return message;
    }
}

module.exports = colorText;