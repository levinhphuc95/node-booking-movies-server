module.exports = (sequelize, Sequelize) => {
  const Cineplex = sequelize.define("Cineplex", {
    maHeThongRap: {
      type: Sequelize.STRING,
    },
    tenHeThongRap: {
      type: Sequelize.STRING,
    },
    biDanh: {
      type: Sequelize.STRING,
    },
    logo: {
      type: Sequelize.STRING,
    },
  });

  return Cineplex;
};
