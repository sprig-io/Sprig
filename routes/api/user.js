const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
if (process.env.NODE_ENV === "development") require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public

router.post("/register", async (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  try {
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({ email: "Email already exists" });
    }
    if (req.body.name === "" || req.body.password === "") {
      return res.status(400).send({ name: "Cannot save empty string as name" });
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    //Hash password before saving in database
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashed;
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);
  try {
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    //Check password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (isMatch) {
      //User matched
      //Create JWT Payload
      const payload = {
        id: foundUser.id,
        name: foundUser.name
      };

      //Sign token
      const token = await jwt.sign(payload, process.env.secretOrKey, {
        expiresIn: 31556926
      });
      res.json({
        success: true,
        token: "Bearer " + token
      });
    } else {
      return res.status(400).json({ passwordincorrect: "Password incorrect" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
