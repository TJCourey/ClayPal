const { model, Schema } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const trapScoreSchema = new Schema({
  overallScore: {
    type: String,
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

const TrapScore = model("TrapScore", trapScoreSchema);

module.exports = TrapScore;
