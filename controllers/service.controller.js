const Service = require("../models/Service");

exports.createService = (req, res) => {
    const service = new Service(req.body);
    service
        .save()
        .then((service) => res.status(200).json(service))
        .catch((error) => res.status(400).json({ message: error.message }));
};

exports.getAllServices = (req, res) => {
    Service.find()
        .then((services) => res.status(200).json(services))
        .catch((error) => res.status(400).json({ message: error.message }));
};

exports.getService = (req, res) => {
    const query = req.params.query;
    Service.findById(query)
        .then((service) => res.status(200).json(service))
        .catch((error) => res.status(400).json({ message: error.message }));
};

exports.updateService = (req, res) => {
    const update = req.body;
    Service.findById(update._id)
        .then((service) => service.updateOne(update))
        .then((service) => res.status(200).json(service))
        .catch((error) => res.status(400).json({ message: error.message }));
};

exports.deleteService = (req, res) => {
    const query = req.params.query;
    Service.findByIdAndDelete(query)
        .then((service) => res.status(200).json(service))
        .catch((error) => res.status(400).json({ message: error.message }));
};