const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createDemoUser = async () => {
  const adminUser = await User.findOne({ role: "Super-Admin" });
  if (adminUser) return;
  const existedUser = await User.findOne({ login: "demo" });
  if (existedUser) return;
  const password = await bcrypt.hash("test", 12);
  const user = await User.create({
    login: "demo",
    password,
    role: "Super-Admin",
    services: ["service1"],
  });
};

module.exports = createDemoUser;
