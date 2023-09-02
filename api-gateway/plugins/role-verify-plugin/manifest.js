module.exports = {
  version: "0.0.1",
  init: function (pluginContext) {
    let policy = require("./policies/verifyRoles");
    pluginContext.registerPolicy(policy);
  },
  policies: ["verify-roles"],
  schema: {
    $id: "https://express-gateway.io/schemas/plugins/my-plugin.json",
  },
};
