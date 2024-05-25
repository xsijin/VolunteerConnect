const modelScore = require("../models/score");

module.exports = {
  getScore,
  createScore,
  getAllByUserId,
};

async function getScore(req, res) {
  console.log("getScore");
  try {
    const data = await modelScore.getScoreById(req.params.id);
    if (data == "null") {
      res.json("no score data found");
    } else {
      res.json(data);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function getAllByUserId(req, res) {
  const userScores = await modelScore.getAllByUserId(req.user.id);;
  res.json(userScores);
}

async function createScore(req, res) {
  try {
    console.log(req.body);
    const data = await modelScore.createScore({
      ...req.body,
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMsg: err.message });
  }
}
