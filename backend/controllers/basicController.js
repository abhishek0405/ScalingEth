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
const addUsedToken = async (req, res) => {
  console.log(req.body);
  var tokenId = req.body.tokenId;
  var user = req.body.user;
  var currUser = await Tokens.findOne({ owner: user });

  var newDoc = {};
  if (currUser === null) {
    newDoc.owner = user;
    newDoc.tokenIdsUsed = [tokenId];
    var DocEntity = new Tokens(newDoc);
    DocEntity.save();
  } else {
    var a = currUser.tokenIdsUsed;
    a.push(tokenId);
    currUser.set({ tokenIdsUsed: a });
    currUser.save();
  }
  console.log("posted");
  res.json({
    status: "sucessfully added",
  });
};
module.exports = {
  getUsedTokens,
  addUsedToken,
};
