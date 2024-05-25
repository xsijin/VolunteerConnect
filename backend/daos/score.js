const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scoreSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    persona: {
      type: Number,
      required: true,
    },
    communication: {
      type: Number,
      required: true,
    },
    creativity: {
      type: Number,
      required: true,
    },
    empathy: {
      type: Number,
      required: true,
    },
    flexibility: {
      type: Number,
      required: true,
    },
    problemsolving: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Score", scoreSchema);
