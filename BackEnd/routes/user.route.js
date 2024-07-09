const express = require("express");
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const { createTokenForUser } = require("../services/authentication.js");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  const user = await User.create({ fullName, email, password });
  if (!user) {
    console.log("User is not created..");
  }

  res.status(201).json({
    message: "User is created successfully.",
    data: {
      fullName: user.fullName,
      email: user.email,
    },
    status: "1",
  });
});

router.post("/login", async (req, res) => {
  if (req.user) {
    return res.status(201).json({
      message: "User is already logged in.",
      status: "3",
    });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    console.log("Invalid email...");
    return;
  }
  const userAuth = await user.isPasswordCorrect(password);

  if (!userAuth) {
    console.log("Password is incorrect");
    return;
  }

  const token = await createTokenForUser(user);

  return res
    .status(201)
    .cookie("uid", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    })
    .json({
      message: "User is authenticated.",
      data: {
        fullName: user.fullName,
        email: user.email,
      },
      status: "1",
    });
});

router.get("/logout", (req, res) => {
  return res.clearCookie("uid").status(201).json({
    status: "5", // status 5 for user is logged out
    message: "User is logged out successfully",
  });
});

router.get("/checkauth", (req, res) => {
  if (!req.user) {
    return res.json({
      message: "User is not logged in.",
      status: "0",
    });
  }

  return res.json({
    message: "User is allready logged in.",
    status: "1",
  });
});




module.exports = router;
