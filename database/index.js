const { Sequelize } = require("sequelize");

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
        console.log("Connection has been established succesfully.");
    } catch (error) {
        console.error("Unable to connect to the database: ", error);
    }
})();

sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`);
  });

module.exports = sequelize;