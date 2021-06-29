const { schema, model, Schema } = require("mongoose");

const trapScoreSchema = new Schema({
  overallScore: {
    type: String,
    required: true,
  },

  station: {
    type: String,
    required: true,
  },

  weapon: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

//const TrapScore = model("trapScore", trapScoreSchema);

module.exports = trapScoreSchema;
