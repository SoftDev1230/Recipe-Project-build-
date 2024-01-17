const fs = require('fs').promises
const db = require("../models");
const config = require("../config/auth.config");
const Recipe = db.recipe;
const Ingredient = db.ingredient;
const Image = db.image;

async function upload(req, res) {
    const files = req.files;
    const imagePaths = [];

    try {
        // Process and store the files as required
        // For example, save the files to a specific directory using fs module
        for (const file of files) {
            const filePath = `storage/uploads/${file.filename}`;

            await fs.rename(file.path, filePath);
            imagePaths.push(filePath);
        }
        res.json(imagePaths);

    } catch (err) {
        // Handle error appropriately and send an error response
        console.error('Error storing files:', err);
        res.status(500).json({ error: 'Failed to store the file' });
    }
}

module.exports = upload;