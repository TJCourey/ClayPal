const { schema, model, Schema } = require("mongoose");
// const SkeetScore = require("./SkeetScore");
// const TrapScore = require("./TrapScore");

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

  skeetScore: [
    {
      type: Schema.Types.ObjectId,
      ref: "SkeetScore",
    },
  ],

  trapScore: [
    {
      type: Schema.Types.ObjectId,
      ref: "TrapScore",
    },
  ],
});

const User = model("User", userSchema);

module.exports = User;
