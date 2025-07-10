const displayList = require("../controllers/displayOnLandingPage.controller");
const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/", displayList.getDisplayList);
router.post("/createDisplayList", verifyToken, displayList.createDisplayList);
router.put("/updateDisplayList", verifyToken, displayList.updateDisplayList);
router.delete("/deleteDisplayList/:query", verifyToken, displayList.deleteDisplayList);
module.exports = router;