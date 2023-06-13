const jwt = require("jsonwebtoken");
require("dotenv").config();
const { StatusCodes } = require("http-status-codes");

async function generateJwtToken(tokenObj) {
  const payload = {
    id: tokenObj.userId,
    emailId: tokenObj.emailId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // expiration time to 1 hour from now
  };
  console.log(payload);
  let secret = process.env.JWT_Secret;
  let token = jwt.sign(payload, secret);
  return token;
}

const verifyJwtToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        error: "Unauthorized request",
        statuscode: StatusCodes.UNAUTHORIZED,
      });
    }
    let token = req.headers.authorization.split(" ")[1];
    if (token === "null") {
      return res.status(401).json({
        error: "Unauthorized request",
        statuscode: StatusCodes.UNAUTHORIZED,
      });
    }
    let payload = jwt.verify(token, process.env.JWT_Secret);

    if (!payload) {
      return res.status(401).json({
        error: "Unauthorized request",
        statuscode: StatusCodes.UNAUTHORIZED,
      });
    }
    req.id = payload.id;
    req.emailId = payload.emailId;
    next();
  } catch (err) {
    return res.status(401).json({
      error: "Unauthorized request",
      statuscode: StatusCodes.UNAUTHORIZED,
    });
  }
};

module.exports = {
  generateJwtToken,
  verifyJwtToken,
};
