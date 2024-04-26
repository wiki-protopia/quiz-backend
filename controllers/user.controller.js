// import { generateToken } from "../middleware/jwtauthToken.js"
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords Do not Match" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "Username already Exists" });
    }

    // hash the password

    const salt = await bcrypt.genSalt(10);
    const hashedPAss = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hashedPAss
    });

    await newUser.save();
    const payload = {
      UserId: newUser._id,
      email: newUser.email
    };
    // console.log(JSON.stringify(payload))

    const token = generateToken(payload)
    // console.log("Token is", token);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      token: token
    });
  } catch (error) {
    console.log("Error in signUp COntroller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // console.log(user.password);
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    // console.log(isPasswordCorrect);

    if (!user || !isPasswordCorrect) {
      res.status(400).json({ error: "Invalid username or password" });
    }

    // generateToken
    const payload = {
      _id: user._id,
      email: user.email
    };
    const token = generateToken(payload);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      token: token
    });
  } catch (error) {
    console.log("Error in login COntroller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.logout = (req, res) => {
  // res.send("Login from Login ROutes")

  try {
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error in logout COntroller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
