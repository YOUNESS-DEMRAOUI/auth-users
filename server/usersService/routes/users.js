const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controllers/usersController");

router.get("/", getUsers);
router.post("/", createUser);

router.get("/:login", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

router.get("/user/:id", getUserById);

module.exports = router;
