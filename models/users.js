const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const users = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
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

module.exports = users;