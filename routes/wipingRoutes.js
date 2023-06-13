const express = require("express");
const WipingPlan = require("../models/wipingplan");
const functionModule = require("../config/Utilities");

const app = express();

app.post("/v1/saveWipings", functionModule.verifyJwtToken, async (req, res) => {
  try {
    console.log(req.emailId, req.id);
    let wipingPlan = {};
    wipingPlan.twCategory = req.body.twCategory;
    wipingPlan.role = req.body.role;
    wipingPlan.shift = req.body.shift;
    wipingPlan.date = req.body.date;
    wipingPlan.engineerName = req.body.engineerName;
    wipingPlan.inCharge = req.body.inCharge;
    wipingPlan.wipingTime = req.body.wipingTime;
    wipingPlan.actualWiping = req.body.actualWiping;
    wipingPlan.operator = req.body.operator;
    wipingPlan.remark = req.body.remark;

    await WipingPlan.saveWipingPlan(wipingPlan);

    res.status(201).json({
      success: "Wipings Details Are Saved",
      statuscode: 201,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Unable to Save Wiping",
      statuscode: 500,
    });
  }
});

app.get(
  "/v1/getWipingPlanDetails/:wipingPlanId",
  functionModule.verifyJwtToken,
  async (req, res) => {
    try {
      let wipingPlanObj = await WipingPlan.findByPk(req.params.wipingPlanId);
      if (wipingPlanObj) {
        res.status(200).json({
          wipingPlanObj,
          statuscode: 200,
          success: "Wiping Plan Data Fetched",
        });
      } else {
        res.status(404).json({
          error: "No Data Associates Along With This Id",
          statuscode: 404,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "Unable To Get Wiping Plan Information",
        statuscode: 500,
      });
    }
  }
);

app.get(
  "/v1/getAllWipings",
  functionModule.verifyJwtToken,
  async (req, res) => {
    try {
      let wipingsDetails = await WipingPlan.findAll();
      if (wipingsDetails.length != 0) {
        res.status(200).json({
          wipingsDetails,
          statuscode: 200,
          success: "Wiping Plan Data Fetched",
        });
      } else {
        res.status(404).json({
          error: "No Data IS Present",
          statuscode: 404,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "Unable To Get Wiping Plan Information",
        statuscode: 500,
      });
    }
  }
);

module.exports = app;
