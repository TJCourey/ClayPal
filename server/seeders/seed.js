const db = require("../config/connection");
const { User, SkeetScore, TrapScore } = require("../models");
const userSeeds = require("./userSeeds.json");
const skeetSeeds = require("./skeetScoreSeeds.json");
const trapSeeds = require("./trapScoreSeeds.json");

db.once("open", async () => {
  try {
    await SkeetScore.deleteMany({});
    await TrapScore.deleteMany({});
    await Users.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < thoughtSeeds.length; i++) {
      const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
