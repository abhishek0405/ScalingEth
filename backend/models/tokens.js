//model for the in game token
const mongoose = require("mongoose");

//company schema
const TokensSchema = mongoose.Schema({
  owner: {
    type: String,
  },
  tokenIdsUsed: {
    type: [Number],
  },
});

module.exports = mongoose.model("Tokens", TokensSchema);
