const controller = require("../controllers/comment.controller.js");
const { authJwt } = require("../middleware");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // app.post("/api/recipe/get", controller.getRecipes);
    // app.get("/api/recipe/:id", controller.getRecipeById);
    app.post("/api/comment/create", [authJwt.verifyToken], controller.createComment)
    // app.post("/api/recipe/edit", controller.editRecipe)
    // app.put("/api/recipe/:recipeId", controller.updateRecipe)
    // app.delete("/api/recipe/:recipeId", controller.removeRecipe)
};
