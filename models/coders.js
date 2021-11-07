const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const profiles = require("./profiles");

const coders = sequelize.define("coders",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    coder_img_route: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    coder: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    time_creation: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
});

module.exports = coders;