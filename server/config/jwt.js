const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./env");

const generateToken = (payload, expiresIn = "7d") => {
  return jwt.sign(payload, jwtSecret, { expiresIn });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
