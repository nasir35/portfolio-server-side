const About = require("../models/About");

exports.createAboutInfo = (req, res) => {
    const about = new About(req.body);
    about
        .save()
        .then((about) => res.status(200).json(about))
        .catch((error) => res.status(400).json({ message: error.message }));
};

exports.getAboutInfo = (req, res) => {
    About.find()
        .then((about) => res.status(200).json(about))
        .catch((error) => res.status(400).json({ message: error.message }));
};

exports.updateAboutInfo = (req, res) => {
    const update = req.body;
    About.findById(update._id)
        .then((about) => about.updateOne(update))
        .then((about) => res.status(200).json(about))
        .catch((error) => res.status(400).json({ message: error.message }));
};

exports.deleteAboutInfo = (req, res) => {
    const query = req.params.query;
    About.findByIdAndDelete(query)
        .then((about) => res.status(200).json(about))
        .catch((error) => res.status(400).json({ message: error.message }));
};
