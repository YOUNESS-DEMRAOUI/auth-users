module.exports = {
  MONGO_IP: process.env.MONGO_IP || "mongodb",
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  SECRET_KEY: process.env.SECRET_KEY || "any",
  PORT: process.env.USERS_PORT || 4000,
};
