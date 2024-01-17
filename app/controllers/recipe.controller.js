const db = require("../models");
const { Op } = require('sequelize');
const config = require("../config/auth.config");
const Recipe = db.recipe;
const Ingredient = db.ingredient;
const Image = db.image;
const Comment = db.comment;
const Step = db.step;

exports.getRecipes = async (req, res) => {
    try {
        var recipes = [];
        var query = req.body;
        var where = {};
        query.map(item => {
            if (item.key === 'user') {
                where[[item.key]] = item.value
            } else if (item.key === "tags") {
                if (item.value) {
                    where[[item.key]] = {
                        [Op.iLike]: `%${item.value}%`,
                    }
                }
            } else {
                if (item.value) {
                    where[[item.key]] = {
                        [Op.iLike]: `%${item.value}%`,
                    }
                }
            }
        })
        console.log(query, where)
        if (req.body.key === undefined || req.body.value === "") {
            recipes = await Recipe.findAll({
                where: where,
                include: [
                    { model: Ingredient, as: 'ingredients' },
                    { model: Image, as: 'images' },
                    { model: Comment, as: 'comments' },
                    { model: Step, as: 'steps' },
                ],
            });
        } else {
            recipes = await Recipe.findAll({
                where: where,
                include: [
                    { model: Ingredient, as: 'ingredients' },
                    { model: Image, as: 'images' },
                    { model: Comment, as: 'comments' },
                    { model: Step, as: 'steps' },
                ],
            });
        }

        res.json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Error fetching recipes' });
    }
};

exports.getRecomRecipes = async (req, res) => {
    try {
        var recipes = [];
        if (req.body.key === undefined) {
            recipes = await Recipe.findAll({
                where: {
                    like: {
                        [Op.gt]: 0
                    },
                },
                include: [
                    { model: Ingredient, as: 'ingredients' },
                    { model: Image, as: 'images' },
                    { model: Comment, as: 'comments' },
                    { model: Step, as: 'steps' },
                ],
            });
        } else {
            recipes = await Recipe.findAll({
                where: {
                    [req.body.key]: {
                        [Op.iLike]: `%${req.body.value}%`
                    },
                    like: {
                        [Op.gt]: 0
                    }
                },
                include: [
                    { model: Ingredient, as: 'ingredients' },
                    { model: Image, as: 'images' },
                    { model: Comment, as: 'comments' },
                    { model: Step, as: 'steps' },
                ],
            });
        }

        res.json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Error fetching recipes' });
    }
};
exports.getRecipeById = async (req, res) => {
    const id = req.params.id;

    try {
        // Find the recipe by ID
        const recipe = await Recipe.findByPk(id, {
            include: [
                { model: Ingredient, as: 'ingredients' },
                { model: Image, as: 'images' },
                { model: Comment, as: 'comments' },
                { model: Step, as: 'steps' }
            ],
        });

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        res.status(200).json(recipe);

    } catch (error) {
        console.error('Error fetching recipe by ID:', error);
        res.status(500).json({ error: 'Error fetching recipe by ID' });
    }
};

exports.createRecipe = async (req, res) => {
    let {
        ingredients = {}, recipe = '', desc = '',
        images = [], dish_type = '', user = '', like = 0,
        prepareing_time = 0, cooking_time = 0, steps = []
    } = req.body;

    images = images.map((item, key) => {
        return {
            path: item
        }
    })
    console.log(req.body)
    const recipes = await Recipe.create(
        {
            name: recipe,
            desc,
            images,
            dish_type,
            prepareing_time,
            cooking_time,
            steps,
            like,
            ingredients,
            user,
        },
        {
            include: [
                { model: Ingredient, as: 'ingredients' },
                { model: Image, as: 'images' },
                { model: Step, as: 'steps' },
            ],
        }
    );

    res.status(200).send(recipes);
};

exports.editRecipe = async (req, res) => {
    console.log(req.body);
    let recipe = req.body;
    const { ingredients, images, steps } = req.body;
    delete recipe['images'];
    delete recipe['ingredients'];
    delete recipe['steps'];

    // 2. Update the Parent Table (Recipe)
    const updatedRecipe = await Recipe.update(
        { ...recipe },
        { where: { id: recipe.id } }
    );

    // Update Ingredients
    if (ingredients !== undefined && ingredients.length) {
        await Ingredient.destroy({ where: { recipeId: recipe.id } });
        await Ingredient.bulkCreate(ingredients.map(ing => ({ ...ing, recipeId: recipe.id })));
    }

    // Update Images
    console.log(images.length);
    if (images.length > 0) {
        await Image.destroy({ where: { recipeId: recipe.id } });
        await Image.bulkCreate(images.map(img => ({ ...img, recipeId: recipe.id })));
    }

    // Update Steps (Assuming 'Step' is the model for the steps)
    if (steps.length > 0) {
        await Step.destroy({ where: { recipeId: recipe.id } });
        await Step.bulkCreate(steps.map(step => ({ ...step, recipeId: recipe.id })));
    }

    // Respond with the updated recipe or any relevant response
    res.json({ message: 'Recipe and associated tables updated successfully' });
};

exports.updateRecipe = async (req, res) => {
    const recipeId = req.params.recipeId;
    const updatedData = req.body;
    try {
        const [updatedRowCount, updatedRecipes] = await Recipe.update(updatedData, {
            where: {
                id: recipeId,
            },
            returning: true, // Include the updated records in the result
        });

        if (updatedRowCount > 0) {
            console.log(`Recipe with id ${recipeId} updated successfully.`);
            console.log('Updated Recipe:', updatedRecipes[0].toJSON());
            res.json({ recipe: updatedRecipes[0].toJSON() });
        } else {
            console.log(`Recipe with id ${recipeId} not found.`);
            res.json({ error: `Recipe with id ${recipeId} not found.` });
        }

    } catch (error) {
        console.error('Error updating recipe:', error);
        throw error; // Handle or propagate the error as needed
    }
};
exports.removeRecipe = async (req, res) => {
    const recipeId = req.params.recipeId;
    try {
        const images = await Image.destroy({
            where: {
                recipeId: recipeId,
            },
        });
        const ingredients = await Ingredient.destroy({
            where: {
                recipeId: recipeId,
            },
        });

        const comments = await Comment.destroy({
            where: {
                id: recipeId,
            },
        });

        const recipes = await Recipe.destroy({
            where: {
                id: recipeId,
            },
        });


        if (recipes > 0 && images > 0 && ingredients > 0) {
            console.log(`Recipe with id ${recipeId} updated successfully.`);
            res.json({ recipe: true });
        } else {
            console.log(`Recipe with id ${recipeId} not found.`);
            res.json({ error: `Recipe with id ${recipeId} not found.` });
        }

    } catch (error) {
        console.error('Error updating recipe:', error);
        throw error; // Handle or propagate the error as needed
    }
};
