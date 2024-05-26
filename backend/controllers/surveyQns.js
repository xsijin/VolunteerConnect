const modelSurvey = require("../models/surveyQns");

module.exports = {
  createSurvey,
};

async function createSurvey(req, res) {
  console.log("createSurvey");
  try {
    const data = await modelSurvey.createSurvey(req.body);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMsg: err.message });
  }
}
