const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.recipe = require("../models/recipe.model.js")(sequelize, Sequelize);
db.ingredient = require("../models/ingredient.model.js")(sequelize, Sequelize);
db.image = require("../models/image.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.comment = require("../models/comment.model.js")(sequelize, Sequelize);
db.step = require("../models/steps.model.js")(sequelize, Sequelize);
db.follower = require("../models/follower.model.js")(sequelize, Sequelize);
// db.following = require("../models/following.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles"
});

db.user.belongsToMany(db.role, {
  through: "user_roles"
});

db.user.hasMany(db.comment, {
  as: "comments",
  // onDelete: 'RESTRIC',
  onUpdate: 'CASCADE'
})

db.comment.belongsTo(db.user, {
  foreignKey: 'user_id',
  as: "users",
  // onDelete: "RESTRIC",
  onUpdate: 'CASCADE'
});

db.recipe.hasMany(db.ingredient, {
  as: "ingredients",
  // onDelete: 'RESTRIC',
  onUpdate: 'CASCADE'
});

db.recipe.hasMany(db.comment, {
  as: "comments",
  // onDelete: 'RESTRIC',
  onUpdate: 'CASCADE'
});

db.recipe.hasMany(db.image, {
  as: "images",
  // onDelete: 'RESTRIC',
  onUpdate: 'CASCADE'
});

db.recipe.hasMany(db.step, {
  as: "steps",
  // onDelete: 'RESTRIC',
  onUpdate: 'CASCADE'
});

db.comment.belongsTo(db.recipe, {
  foreignKey: 'recipe_id',
  as: "recipes",
  // onDelete: "RESTRIC",
  onUpdate: 'CASCADE'
});

db.ingredient.belongsTo(db.recipe, {
  foreignKey: "recipe_id",
  as: "recipes",
  // onDelete: 'RESTRIC',
  onUpdate: 'CASCADE'
});

db.image.belongsTo(db.recipe, {
  foreignKey: "recipe_id",
  as: "recipes",
  // onDelete: 'RESTRIC',
  onUpdate: 'CASCADE'
});

db.step.belongsTo(db.recipe, {
  foreignKey: "recipe_id",
  as: "recipes",
  // onDelete: 'RESTRIC',
  onUpdate: 'CASCADE'
});


db.user.belongsToMany(db.user, { as: 'follow', through: db.follower, foreignKey: 'followingId', hook: true });
db.user.belongsToMany(db.user, { as: 'following', through: db.follower, foreignKey: 'followerId', hook: true });


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
