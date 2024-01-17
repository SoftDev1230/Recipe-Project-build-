
module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define("images", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,

        },
        recipe_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'recipes', // Can be both a string representing the table name or a Sequelize model
                key: 'id',
            },
        },
        path: {
            type: Sequelize.STRING
        }
    });

    return Image;
};
