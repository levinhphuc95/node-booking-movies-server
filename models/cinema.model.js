module.exports = (sequelize, Sequelize) => {
  const Cinema = sequelize.define("Cinema", {
    maCumRap: {
      type: Sequelize.STRING,
    },
    tenCumRap: {
      type: Sequelize.STRING,
    },
    diaChi: {
      type: Sequelize.STRING,
    },
  });

  return Cinema;
};
