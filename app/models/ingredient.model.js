
module.exports = (sequelize, Sequelize) => {
    const Ingredient = sequelize.define("ingredients", {
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
        ingredient: {
            type: Sequelize.STRING
        },
        last: {
            type: Sequelize.STRING
        },
        unit: {
            type: Sequelize.STRING
        }
    });

    return Ingredient;
};
