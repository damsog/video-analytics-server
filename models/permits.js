const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const permits = sequelize.define("permits",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    time_creation: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
});

module.exports = permits;