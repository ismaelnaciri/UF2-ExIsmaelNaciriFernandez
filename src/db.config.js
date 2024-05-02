const Sequelize = require("sequelize");

const crearConfigBD = () => {
  return new Sequelize("uni_ismael_naciri_fernandez", "isma", "patata1234", {
    host: "127.0.0.1",
    port: 3308,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 1000,
    },
  });
}

module.exports = {crearConfigBD};
