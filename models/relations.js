const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const groups = require("./groups");
const profiles = require("./profiles");

const relations = sequelize.define("relations",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    time_creation: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.DATE,
        allowNull: DataTypes.NOW
    },
});

relations.belongsToMany(profiles, {as: "profile_id"});
relations.belongsToMany(groups, {as: "group_id"});

module.exports = relations;
