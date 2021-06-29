const { schema, model, Schema } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const trapScoreSchema = new Schema({
  overallScore: {
    type: String,
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

const TrapScore = model("TrapScore", trapScoreSchema);

module.exports = TrapScore;
