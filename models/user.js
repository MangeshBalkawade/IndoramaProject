const sequelize = require("../config/DataBaseConfig");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    emailId: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    updatedAt: true,
    createdAt: true,
    timestamps: true,
  }
);

User.sync({});

User.saveUser = async function save(userObj) {
  this.create({
    name: userObj.name,
    emailId: userObj.emailId,
    password: userObj.password,
  });
};

User.findByEmail = async function findByEmail(email) {
  return await this.findOne({
    where: {
      emailId: email,
    },
  });
};

module.exports = User;
