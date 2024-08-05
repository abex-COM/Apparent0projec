const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken"); //import
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const getUsers = async (req, res) => {
  res.send("User gets properly");
};
const userModel = require("../models/userModel.js");
//register
const signup = async (req, res) => {
  const { email, password, name, role } = req.body;
  try {
    const oldUser = await userModel.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await userModel.create({
      email,
      name,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};
//get users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password").sort({ _id: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: "Interal server error" });
  }
};
//Update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No user with id: ${id}`);

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { ...user },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: "Internal server error" });
  }
};

//get a user
const getUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const user = await userModel.findById(userId).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

// Assuming you're using Express.js, you would set up your route like this:
// const express = require('express');
// const router = express.Router();
// router.get('/user/:id', getSingleUser);

//Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No user exist with id: ${id} ` });
    }
    await userModel.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Internal server error" });
  }
};

///SignIn
const secret = "testjhjdksflslsfjksdfnj";
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await userModel.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });
    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password,oldUser.password);
    const user = await userModel.findOne({ email }).select("-password");
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { role: oldUser.role, id: oldUser._id, name: oldUser.name },
      secret,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json({ message: "Interal server error" });
    console.log(error);
  }
};
module.exports = {
  signup,
  getUsers,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  signin,
};
