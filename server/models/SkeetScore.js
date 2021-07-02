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
    },
  ],

  weapon: {
    type: String,
  },
  shooter: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const SkeetScore = model("SkeetScore", skeetScoreSchema);

module.exports = SkeetScore;
