const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();
const jwtAuthenticationMiddleware = require('../middleware/jwtAuthenticationMiddleware')

router.post("/image/upload", jwtAuthenticationMiddleware, upload.single("file"), async (req, res) => {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:8080/images/${req.file.filename}`;
    return res.send(imgUrl);
});

module.exports = router;