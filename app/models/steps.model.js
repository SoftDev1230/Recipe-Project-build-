module.exports = (sequelize, Sequelize) => {
    const Step = sequelize.define("steps", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        step_num: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        content: {
            type: Sequelize.TEXT,
            defadefaultValue: ''
        },
        recipe_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'recipes', // Can be both a string representing the table name or a Sequelize model
                key: 'id',
            }
        },
    });

    return Step;
};
