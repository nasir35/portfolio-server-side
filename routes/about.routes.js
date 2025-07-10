const aboutController = require("../controllers/about.controller");
const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/", aboutController.getAboutInfo);
router.post("/createAboutInfo",verifyToken, aboutController.createAboutInfo);
router.put("/updateAboutInfo",verifyToken, aboutController.updateAboutInfo);
router.delete("/deleteAboutInfo/:query", verifyToken, aboutController.deleteAboutInfo);
module.exports = router;