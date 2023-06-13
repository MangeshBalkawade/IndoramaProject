const express = require("express");
const functionModule = require("../config/Utilities");
const User = require("../models/user");

const app = express();

app.get("/v1/user/login", async (req, res) => {
  try {
    if (req.body.emailId && req.body.password) {
      let existUser = await User.findByEmail(req.body.emailId);
      if (existUser) {
        if (existUser.password == req.body.password) {
          let userId = existUser.userId;
          let emailId = existUser.emailId;
          let tokenObj = {
            userId,
            emailId,
          };
          let token = await functionModule.generateJwtToken(tokenObj);
          res.status(200).json({
            token,
            statuscode: 200,
            success: "Token Send",
          });
        } else {
          res.status(401).json({
            error: "Invalid Password",
            statuscode: 401,
          });
        }
      } else {
        res.status(401).json({
          error: "User Does Not Exist",
          statuscode: 401,
        });
      }
    } else {
      res.status(422).json({
        error: "Please Provide EmailId And Password",
        statuscode: 422,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Unable To Login",
      statuscode: 500,
    });
  }
});

app.post("/v1/registerUser", async (req, res) => {
  try {
    if (
      req.body.name == null ||
      req.body.password == null ||
      req.body.emailId == null
    ) {
      return res.status(422).json({
        error: "Please Provide EmailId , Name and Password",
        statuscode: 422,
      });
    }

    let userObj = {};
    userObj.name = req.body.name;
    (userObj.password = req.body.password),
      (userObj.emailId = req.body.emailId);

    let existUser = await User.findByEmail(req.body.emailId);
    if (existUser) {
      res.status(409).json({
        error: "EmailId Is Aleready Used",
        statuscode: 409,
      });
    } else {
      await User.saveUser(userObj);
      res.status(201).json({
        success: "User Is Created",
        statuscode: 201,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Unable To Login",
      statuscode: 500,
    });
  }
});

module.exports = app;
