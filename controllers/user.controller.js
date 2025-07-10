const mongoose = require("mongoose");
const User = require("../models/User");
const generateJwtToken  = require("../utils/generateJwtToken");

exports.updateUser = (req, res) => {
    const update = req.body;
    const user = User.findOne({ email : update.email });
    if(!user){
        return res.status(404).json({ message: "User not found" });
    }
    user
        .updateOne(update)
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(400).json({ message: error.message }));
}

exports.getUser = async (req, res) => {
    const query = req.params.query;   

    try {
        let user;
        if (mongoose.Types.ObjectId.isValid(query)) {
            user = await User.findById(query);
        }
        if (!user) {
            user = await User.findOne({
                $or: [ 
                    { email: query },
                    { name: query },
                    { phone: query },
                ],
            });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllUsers = (req, res) => {
    User.find()
        .then((users) => res.status(200).json(users))
        .catch((error) => res.status(400).json({ message: error.message }));
}

exports.login = async (req, res) => {
     try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        error: "Please provide your credentials",
      });
    }

    const user = await User.findOne({email});
    
    if (!user) {
      return res.status(404).json({
        status: "fail",
        error: "No user found. Please create an account",
      });
    }
    
    let isPasswordValid = false;
    try {
      isPasswordValid = user.matchPassword(password);
    } catch (error) {
      console.log("matching error");
      
    }
    
    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        error: "Password is not correct",
      });
    }
    
    let token;
    try {
      token = generateJwtToken(user);
    } catch (error) {
      console.log("error on generating token", error);
    }    

    const { password: pwd, ...others } = user.toObject();

    res.status(200).json({
      status: "success",
      message: "Successfully logged in",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

exports.createUser = (req, res) => {
    const user = new User(req.body);
    user
        .save()
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(400).json({ message: error.message }));
}