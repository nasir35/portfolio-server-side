const Project = require("../models/Project");

exports.getAllProjects = (req, res) => {
    Project.find()
        .then((projects) => res.status(200).json(projects))
        .catch((error) => res.status(400).json({ message: error.message }));
}; 

exports.getProject = (req, res) => {
    const query = req.params.query;
    Project.findById(query)
        .then((project) => res.status(200).json(project))
        .catch((error) => res.status(400).json({ message: error.message }));
};

exports.createProject = (req, res) => {
    const project = new Project(req.body);
    project
        .save()
        .then((project) => res.status(200).json(project))
        .catch((error) => res.status(400).json({ message: error.message }));
};

exports.updateProject = async (req, res) => {
    const update = req.body;
    const project = await Project.findById(update._id);
    if(!project){
        return res.status(404).json({ message: "Project not found" });
    }
    project
        .updateOne(update)
        .then((project) => res.status(200).json(project))
        .catch((error) => res.status(400).json({ message: error.message }));
};

exports.deleteProject = (req, res) => {
    const query = req.params.query;
    Project.findByIdAndDelete(query)
        .then((project) => res.status(200).json(project))
        .catch((error) => res.status(400).json({ message: error.message }));
};