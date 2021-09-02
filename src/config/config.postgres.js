module.exports = {
  HOST: "db",
  USER: "postgres",
  PASSWORD: "dbpassword",
  DB: "movies",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
