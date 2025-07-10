const { default: mongoose } = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    companyUrl: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Review", ReviewSchema);