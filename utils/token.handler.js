const jwt = require("jsonwebtoken");

const createToken = async (tokenPayload) => {
  return jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY);
};

module.exports = { createToken };
