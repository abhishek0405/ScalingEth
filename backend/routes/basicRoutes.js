//setup backend routes
const express = require("express");
const router = express.Router();

const {
  getUsedTokens,
  addUsedToken,
  checkTokenIdUsed,
} = require("../controllers/basicController");

router.get("/getUsedTokens", getUsedTokens);
router.post("/addUsedToken", addUsedToken);
router.post("/checkUsedToken", checkTokenIdUsed);
