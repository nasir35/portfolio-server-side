const  mongoose  = require("mongoose");

const aboutSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    aboutMe : {
        type : String,
        required : true
    },
    resumeLink: {
        type : String,
        required : true
    },
    skills: {
        type : [
            {
                technology: {
                    type: String,
                    required: true
                },
                level: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    experience: {
        type: [
            {
                companyName: {
                    type: String,
                    required: true
                },
                companyLogo:{
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                },
                role: {
                    type: String,
                    required: true
                },
                duration: {
                    type: String,
                    required: true
                },
                description: {
                    type: String,
                    required: true
                },
                reference : {
                    type: String
                }
            }
        ]
    },
    education: {
        type: [
            {
                degree: {
                    type: String,
                    required: true
                },
                institute: {
                    type: String,
                    required: true
                },
                duration: {
                    type: String,
                    required: true
                },
                result : {
                    type: String
                }
            }
        ]
    }
});

module.exports = mongoose.model("About", aboutSchema);