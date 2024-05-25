const daoScore = require("../daos/score");

module.exports = {
  getScoreById,
  createScore,
  updateScore,
  getAllByUserId,
};

async function getScoreById(param) {
  const data = await daoScore.findOne({ _id: param });
  return data;
}

async function getAllByUserId(id) {
  return daoScore.find({
    user: id,
  });
}

async function createScore(body) {
  const data = await daoScore.create(body);
  console.log(data);
  return data;
}

async function updateScore(score, user) {
  const data = await daoScore.findOneAndUpdate(
    { _id: score },
    {
      user: user,
    },
    {
      new: true, // "true" returns the doc (ie, record) after update was applied. else, it returns e original doc by default
    }
  );
  return data;
}
