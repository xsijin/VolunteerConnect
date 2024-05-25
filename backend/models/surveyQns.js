const daoScore = require("../daos/surveyQns");

module.exports = {
  createSurvey,
};

async function createSurvey(body) {
  const data = await daoScore.create(body);
  console.log(data);
  return data;
}
