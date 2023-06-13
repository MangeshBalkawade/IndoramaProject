const sequelize = require("../config/DataBaseConfig");
const { DataTypes } = require("sequelize");

const WipingPlan = sequelize.define(
  "WipingPlan",
  {
    wipingPlanTwId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    twCategory: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    shift: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
    engineerName: {
      type: DataTypes.STRING,
    },
    inCharge: {
      type: DataTypes.STRING,
    },
    wipingTime: {
      type: DataTypes.STRING,
    },
    actualWiping: {
      type: DataTypes.STRING,
    },
    operator: {
      type: DataTypes.STRING,
    },
    remark: {
      type: DataTypes.STRING,
    },
  },
  {
    updatedAt: true,
    createdAt: true,
    timestamps: true,
  }
);

WipingPlan.saveWipingPlan = async function (wipingPlanObj) {
  return await this.create({
    twCategory: wipingPlanObj.twCategory,
    role: wipingPlanObj.role,
    shift: wipingPlanObj.shift,
    date: wipingPlanObj.date,
    engineerName: wipingPlanObj.engineerName,
    inCharge: wipingPlanObj.inCharge,
    wipingTime: wipingPlanObj.wipingTime,
    actualWiping: wipingPlanObj.actualWiping,
    operator: wipingPlanObj.operator,
    remark: wipingPlanObj.remark,
  });
};

WipingPlan.sync({});

module.exports = WipingPlan;
