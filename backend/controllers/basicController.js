//controller logic goes here
const Tokens = require("../models/tokens");

const getUsedTokens = async (req, res) => {
  var user = req.query.user;
  console.log(user);
  var currUser = await Tokens.findOne({ owner: user });
  console.log(currUser);
  var data = [];
  if (currUser === null) {
    return res.json({
      data: [],
    });
  }

  res.json({
    data: currUser.tokenIdsUsed,
  });
};

module.exports = {
  getUsedTokens,
};
