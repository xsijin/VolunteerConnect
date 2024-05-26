const daoSurvey = require("../daos/surveyQns");

module.exports = {
  createSurvey,
};

async function createSurvey(body) {
  const data = await daoSurvey.create(body);
  console.log("model data: ", data);
  return data;
}
