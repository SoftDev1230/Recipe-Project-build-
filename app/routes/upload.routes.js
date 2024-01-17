const upload = require("../controllers/image.controller.js");
const uploadMiddleware = require("../middleware/upload.js");
const { authJwt } = require("../middleware");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/images/upload", uploadMiddleware.array("files"), upload);
};