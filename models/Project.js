const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    visitLink: {
      type: String,
      required: true,
    },
    githubLink: {
      type: [String],
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    galleryUrls: {
      type: [String],
      required: true,
    },
    technologies: {
      type: [String],
      required: true,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
