const db = require("../models");
const config = require("../config/auth.config");
const Recipe = db.recipe;
const Ingredient = db.ingredient;
const Image = db.image;
const Comment = db.comment;

exports.createComment = async (req, res) => {
    let comment = req.body;
    comment = await Comment.create(
        comment,
    );
    res.status(200).send(comment);
};

