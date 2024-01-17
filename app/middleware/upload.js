const multer = require("multer");
// const sharp = require("sharp");

const uniqid = require('uniqid');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + uniqid() + path.extname(file.originalname))
    }
});

var uploadMiddleware = multer({ storage: storage });

module.exports = uploadMiddleware;
