const Review = require("../models/Review");

exports.createReview = (req, res) => {
    const review = new Review(req.body);
    review
        .save()
        .then((review) => res.status(200).json(review))
        .catch((error) => res.status(400).json({ message: error.message }));
};

exports.getAllReviews = (req, res) => {
    Review.find()
        .then((reviews) => res.status(200).json(reviews))
        .catch((error) => res.status(400).json({ message: error.message }));
};

exports.getReview = (req, res) => {
    const query = req.params.query;
    Review.findById(query)
        .then((review) => res.status(200).json(review))
        .catch((error) => res.status(400).json({ message: error.message }));
};

exports.deleteReview = (req, res) => {
    const query = req.params.query;
    Review.findByIdAndDelete(query)
        .then((review) => res.status(200).json(review))
        .catch((error) => res.status(400).json({ message: error.message }));
};

exports.updateReview = (req, res) => {
    const update = req.body;
    Review.findById(update._id)
        .then((review) => review.updateOne(update))
        .then((review) => res.status(200).json(review))
        .catch((error) => res.status(400).json({ message: error.message }));
};