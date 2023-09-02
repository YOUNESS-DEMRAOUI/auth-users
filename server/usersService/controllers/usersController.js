const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    const { user } = req.body;
    const reqUser = await User.findById(user.sub);
    let users;
    if (reqUser.role == "Admin") {
      users = await User.find({ role: "User" }).select("-password");
    } else {
      users = await User.find().select("-password");
    }

    res.status(200).json({ message: "success", users });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUser = async (req, res) => {
  try {
    const { login } = req.params;
    const user = await User.findOne({ login });
    if (user) {
      res.status(200).json({ message: "success", user });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ message: "success", user });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createUser = async (req, res) => {
  try {
    const { login, password, role, services } = req.body;
    const hashedPass = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      login,
      password: hashedPass,
      role: role || "User",
      services,
    });
    res.status(200).json({ message: "User Created Successfuly" });
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ message: "Login already taken", err });
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { login, password, role, services } = req.body;
    const user = await User.findById(id);
    if (login) {
      user.login = login;
    }
    if (role) {
      user.role = role;
    }
    if (services.length > 0) {
      user.services = services;
    }
    if (password) {
      const hashedPass = await bcrypt.hash(password, 12);
      user.password = hashedPass;
    }
    user.save();
    res.status(200).json({ message: "User Updated Successfuly" });
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ message: "Login already taken", err });
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User Deleted Successfuly" });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
};
