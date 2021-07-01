const { schema, model, Schema } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const skeetScoreSchema = new Schema({
  overallScore: {
    type: Number,
    required: true,
  },

  station: [
    {
      type: String,
      required: true,
    },
  ],

  weapon: {
    type: String,
    required: true,
  },
  shooter: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const SkeetScore = model("SkeetScore", skeetScoreSchema);

module.exports = SkeetScore;
