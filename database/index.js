const { Sequelize } = require("sequelize");
const logger = require('../lib/logger');
const colorText = require('../lib/colortext');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: (process.env.DB_LOGGING === "true"),
    }
);


(async () => {
    try {
        await sequelize.authenticate();
        logger.info( colorText("SERVER DATABASE INFO: Connection has been established succesfully.") );
    } catch (error) {
        logger.info( colorText("SERVER DATABASE INFO: Unable to connect to the database: ", error) );
    }
})();

sequelize.sync({ force: false })
  .then(() => {
    logger.info( colorText(`SERVER DATABASE INFO: Database & tables created!`) );
  });

module.exports = sequelize;