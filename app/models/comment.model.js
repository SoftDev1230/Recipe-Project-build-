
module.exports = (sequelize, Sequelize) => {
    const comment = sequelize.define("comments", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        recipe_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'recipes', // Can be both a string representing the table name or a Sequelize model
                key: 'id',
            }
        },
        content: {
            type: Sequelize.TEXT
        },
        author: {
            type: Sequelize.STRING
        },
        datetime: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users', // Can be both a string representing the table name or a Sequelize model
                key: 'id',
            }
        }
    });

    return comment;
};
