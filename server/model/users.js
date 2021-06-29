const { schema, model, Schema } = require("mongoose");
const skeetScoreSchema = require("./skeetScore");
const trapScoreSchema = require("./trapScore");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
    minLength: 5,
  },

  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },

  skeetScore: [skeetScoreSchema],

  trapScore: [trapScoreSchema],
});

const User = model("User", userSchema);

module.exports = User;
