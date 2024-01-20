module.exports = {
  HOST: "db-postgresql-fra1-40306-do-user-15499151-0.c.db.ondigitalocean.com",
  USER: "doadmin",
  PASSWORD: "AVNS_sqULhto-jrLyjbeasw1",
  DB: "defaultdb",
  dialect: "postgres",
  PORT: 25060,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
