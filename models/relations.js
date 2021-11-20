const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const relations = sequelize.define("relations",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    time_creation: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
});

module.exports = relations;
