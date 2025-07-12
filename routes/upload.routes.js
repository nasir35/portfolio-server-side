const express = require("express");
const { uploadMultipleImages } = require("../controllers/upload.controller");
const verifyToken = require("../middlewares/verifyToken");
const upload = require("../config/multer.config");
const router = express.Router();

router.post(
  "/",
  verifyToken,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  uploadMultipleImages
);
module.exports = router;
