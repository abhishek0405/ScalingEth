const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const path = require("path");
const cors = require("cors");
app.use(express.json());

app.listen(process.env.PORT || 5000, function () {
  console.log("Server Started at http://localhost:5000/");
});
