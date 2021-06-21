const { DataTypes } = require("sequalize");
const { Sequelize } = require("sequelize/types");
const sequalize = require("../database");

const Users = sequalize.define("Users", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nick: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    time_register: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Users;