const express = require("express");
const {uploadMultipleImages} = require("../controllers/upload.controller");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/upload", verifyToken, uploadMultipleImages);
module.exports = router;