const express = require("express");
const parser = require("body-parser");
const wipingPlanRoutes = require("./routes/wipingRoutes");
const UserRoutes=require("./routes/UserRoutes")
require("dotenv").config();

const app = express();
app.use(parser.json());
app.use(wipingPlanRoutes);
app.use(UserRoutes)

app.listen(process.env.Port, (req, res) => {
  console.log("Server Is Running On Port " + process.env.Port);
});
