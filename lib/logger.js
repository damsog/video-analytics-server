const { format, createLogger,transports } = require('winston');
require('dotenv').config()

const myFormatter = format.printf(({level,message,timestamp, stack}) => {
    return `[${timestamp}] : : ${level} : : ${message || stack}`;
});

const logger = createLogger({
    level: process.env.LOGGER_LEVEL,
    format: format.combine( 
        format.colorize(),
        format.timestamp({ format: 'YYYY:MM:DD HH:MM:SS TZ' }),
        format.errors({stack: true}),
        myFormatter),
    transports: [new transports.Console()]
});

module.exports = logger;