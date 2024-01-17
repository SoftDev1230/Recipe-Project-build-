module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    surname: {
      type: Sequelize.STRING
    },
    avatar: {
      type: Sequelize.STRING
    },
    connect: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  });

  return User;
};
