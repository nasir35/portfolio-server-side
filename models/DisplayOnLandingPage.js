const { default: mongoose } = require("mongoose");

const displayOnLandingPageSchema = new mongoose.Schema({
  skills: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "About",
        required: true,
      },
    ],
  },
  projects: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
      },
    ],
  },
  services: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
      },
    ],
  },
  reviews : {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
        required: true,
      },
    ],
  }
});

module.exports = mongoose.model(
  "DisplayOnLandingPage",
  displayOnLandingPageSchema
);
