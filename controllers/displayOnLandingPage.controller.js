const DisplayOnLandingPage = require("../models/DisplayOnLandingPage");

exports.createDisplayList = (req, res) => {
    const display = new DisplayOnLandingPage(req.body);
    display
        .save()
        .then((display) => res.status(200).json(display))
        .catch((error) => res.status(400).json({ message: error.message }));
};

exports.getDisplayList = (req, res) => {
    DisplayOnLandingPage.find()
        .then((display) => res.status(200).json(display))
        .catch((error) => res.status(400).json({ message: error.message }));
};

exports.deleteDisplayList = (req, res) => {
    const query = req.params.query;
    DisplayOnLandingPage.findByIdAndDelete(query)
        .then((display) => res.status(200).json(display))
        .catch((error) => res.status(400).json({ message: error.message }));
};

exports.updateDisplayList = (req, res) => {
    const update = req.body;
    DisplayOnLandingPage.findById(update._id)
        .then((display) => display.updateOne(update))
        .then((display) => res.status(200).json(display))
        .catch((error) => res.status(400).json({ message: error.message }));
};