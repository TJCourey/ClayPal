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

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
