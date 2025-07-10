const serviceController = require("../controllers/service.controller");
const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/", serviceController.getAllServices);
router.get("/getService/:query", serviceController.getService);
router.post("/createService", verifyToken, serviceController.createService);
router.put("/updateService", verifyToken, serviceController.updateService);
router.delete("/deleteService/:query", verifyToken, serviceController.deleteService);
module.exports = router;