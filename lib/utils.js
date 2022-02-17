const bcrypt = require('bcryptjs');
const logger = require('./logger');
const colorText = require('./colortext');
const utils = {};

utils.encryptPassword = async (password) => {
    logger.debug( colorText("Encrypting Password: Password Received. Encrypting") );
    const salt = await bcrypt.genSalt(10);
    logger.debug( colorText("Encrypting Password: Salt generated") );
    const hashedPassword = await bcrypt.hash(password, salt);
    logger.debug( colorText("Encrypting Password: Password hashed. returning") );
    return hashedPassword;
}

utils.matchedPassword = async (password, savedPassword) => {
    try{
        logger.debug( colorText("Matching Password: Received. Trying to compare") );
        const result = await bcrypt.compare(password, savedPassword);
        logger.debug( colorText("Matching Password: Compared successful. result: "+ result ) );
        return result;
    }catch(e) {
        logger.error( colorText(e) );
        return 0;
    }
}

module.exports = utils;