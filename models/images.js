const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const images = sequelize.define("images",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    coder_img_route: {
        type: DataTypes.STRING(120),
        allowNull: false
    },
    coder: {
        type: DataTypes.STRING(60),
        allowNull: true
    },
    time_creation: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
});

module.exports = images;