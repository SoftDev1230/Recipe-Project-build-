module.exports = {
  HOST: "95.217.33.57",
  PORT: '7777',
  USER: "postgres",
  PASSWORD: "123456789",
  DB: "testdb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
