const axios = require("axios");
axios.defaults.baseURL = `http://users-service:4000`;
module.exports = {
  name: "verify-roles",
  schema: {
    $id: "http://express-gateway.io/schemas/policies/my-policy.json",
    type: "object",
  },
  policy: (actionParams) => {
    return async (req, res, next) => {
      const { sub } = req.user;
      const response = await axios
        .get(`/api/v1/users/user/${sub}`)
        .then(({ data }) => {
          const user = data?.user;
          const allowedRoles = actionParams.roles;
          const result = allowedRoles.includes(user?.role);
          if (result) {
            next();
          } else {
            res.sendStatus(401);
          }
        })
        .catch((err) => {
          return res.sendStatus(400);
        });
    };
  },
};
