const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const generateToken = (payload) => {
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "30d" });

  return token;
};

const verifyToken = (token) => {
  const decoded = jwt.verify(token, SECRET_KEY);

  return decoded;
};

module.exports = { generateToken, verifyToken };