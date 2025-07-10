const reviewController = require("../controllers/review.controller");
const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/", reviewController.getAllReviews);
router.get("/getReview/:query", reviewController.getReview);
router.post("/createReview", verifyToken, reviewController.createReview);
router.put("/updateReview", verifyToken, reviewController.updateReview);
router.delete("/deleteReview/:query", verifyToken, reviewController.deleteReview);
module.exports = router;