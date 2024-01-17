const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Follower = sequelize.define("follower", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    followed_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    followerId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users', // Can be both a string representing the table name or a Sequelize model
        key: 'id',
      },
    },
    followingId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users', // Can be both a string representing the table name or a Sequelize model
        key: 'id',
      },
    },
  });

  return Follower;
};
