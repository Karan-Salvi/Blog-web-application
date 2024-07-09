const JWT = require("jsonwebtoken");
const { model } = require("mongoose");

const secret = "N43Hg5K8LpM3RfE";

const createTokenForUser = async (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImage: user.profileImage,
    role: user.role,
  };
  const token = await JWT.sign(payload, secret, {
    expiresIn: "1d",
  });
  return token;
};

const validateToken = async (token) => {
  const payload = await JWT.verify(token, secret);
  return payload;
};

module.exports = {
  createTokenForUser,
  validateToken,
};
