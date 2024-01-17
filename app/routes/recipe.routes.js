const controller = require("../controllers/recipe.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/recipe/get", [authJwt.verifyToken], controller.getRecipes);
    app.post("/api/recipe/recommended", [authJwt.verifyToken], controller.getRecomRecipes);
    app.get("/api/recipe/:id", [authJwt.verifyToken], controller.getRecipeById);
    app.post("/api/recipe/create", [authJwt.verifyToken], controller.createRecipe)
    app.post("/api/recipe/edit", [authJwt.verifyToken], controller.editRecipe)
    app.put("/api/recipe/:recipeId", [authJwt.verifyToken], controller.updateRecipe)
    app.delete("/api/recipe/:recipeId", [authJwt.verifyToken], controller.removeRecipe)
};
