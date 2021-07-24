const DB_USERNAME = process.env.DB_USERNAME || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.HOST || "db";
const DB_PORT = process.env.DB_PORT || "5432";
const DB_NAME = process.env.NAME || "movies";

module.exports = { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT };
