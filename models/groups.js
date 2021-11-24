const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const groups = sequelize.define("profile_groups",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    dataset_route: {
        type: DataTypes.STRING(60),
        allowNull: true
    },
    time_creation: {
        type: DataTypes.DATE,
        allowNull:false,
        defaultValue: DataTypes.NOW
    }
});

module.exports = groups;