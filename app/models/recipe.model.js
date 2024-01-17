module.exports = (sequelize, Sequelize) => {
    const Recipe = sequelize.define("recipes", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING
        },
        desc: {
            type: Sequelize.TEXT
        },
        dish_type: {
            type: Sequelize.STRING
        },
        tags: {
            type: Sequelize.TEXT,
            defaultValue: ""
        },
        prepareing_time: {
            type: Sequelize.INTEGER
        },
        cooking_time: {
            type: Sequelize.INTEGER
        },
        // steps: {
        //     type: Sequelize.TEXT
        // },
        like: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        user: {
            type: Sequelize.STRING,
            defaultValue: ''
        }

    });

    return Recipe;
};
