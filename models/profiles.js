const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const profiles = sequelize.define("profiles",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    fullname: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    nickname: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    time_register: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
});

module.exports = profiles;