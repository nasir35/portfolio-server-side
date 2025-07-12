const express = require("express");
const { uploadMultipleImages } = require("../controllers/upload.controller");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/", verifyToken, uploadMultipleImages);
module.exports = router;
