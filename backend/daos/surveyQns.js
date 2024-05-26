const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const surveyQnsSchema = new Schema(
  {
    questionOne: {
      type: String,
      required: true,
    },
    questionTwo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SurveyQns", surveyQnsSchema);
