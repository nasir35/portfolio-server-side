const projectController = require("../controllers/project.controller");
const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/", projectController.getAllProjects);
router.get("/getProject/:query", projectController.getProject);
router.post("/createProject", verifyToken, projectController.createProject);
router.put("/updateProject", verifyToken, projectController.updateProject);
router.delete("/deleteProject/:query", verifyToken, projectController.deleteProject);
module.exports = router;