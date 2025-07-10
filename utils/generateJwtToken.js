const jwt = require("jsonwebtoken");

const generateJwtToken = (user) => {
    try {
        const token =  jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "30d",
        }
    );
    return token;
    } catch (error) {
        console.log("error in generating token. ", error);
    }
};

module.exports = generateJwtToken;