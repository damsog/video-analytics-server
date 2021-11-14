const bcrypt = require('bcryptjs');

const utils = {};

utils.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}

utils.matchedPassword = async (password, savedPassword) => {
    try{
        const result = await bcrypt.compare(password, savedPassword);
        return result;
    }catch(e) {
        console.log(e);
        return 0;
    }
}

module.exports = utils;