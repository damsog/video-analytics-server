const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const profiles = require("./profiles");
const users = require("./users");

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

permits.belongsToMany(users, {as: "user_grant_id"});
permits.belongsToMany(profiles, {as: "profile_grant_id"});
permits.belongsToMany(users, {as: "user_receive_id"});

module.exports = permits;