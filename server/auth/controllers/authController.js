const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const { SECRET_KEY } = require("../config/config");
axios.defaults.baseURL = `http://users-service:${process.env.USERS_PORT}`;

const login = async (req, res) => {
  const { login, password } = req.body;
  const response = await axios
    .get(`/api/v1/users/${login}`)
    .then(async ({ data }) => {
      const user = data.user;
      const compare = await bcrypt.compare(password, user.password);
      if (compare) {
        const token = jwt.sign({ sub: user._id }, SECRET_KEY, {
          expiresIn: "2d",
        });
        delete user.password;
        return res.status(200).json({ status: "success", user, token });
      } else {
        return res
          .status(403)
          .json({ status: "failed", error: "credentials incorrect" });
      }
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ status: "failed", error: "User not found" });
    });
};

module.exports = {
  login,
};
