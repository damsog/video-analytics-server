const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const users = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    username: {
        type: DataTypes.STRING(16),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    fullname: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    nick: {
        type: DataTypes.STRING(60),
        allowNull: true,
    },
    logo: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    time_register: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    }
});

module.exports = users;