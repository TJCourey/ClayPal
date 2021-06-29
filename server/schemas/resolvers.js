const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate("skeetScore").populate("trapScore");
    },
    user: async (parent, { username }) => {
      return await User.findOne({ username })
        .populate("skeetScore")
        .populate("trapScore");
    },
    skeetScore: async (parent, { username }, context) => {
      const params = username ? { username } : {};
      return await User.findOne({ _id: context.user._id }).populate(
        "skeetScore"
      );
    },
    trapScore: async (parent, { username }, context) => {
      const params = username ? { username } : {};
      return await User.findOne({ _id: context.user._id }).populate(
        "trapScore"
      );
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    addSkeetScore: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              skeetScore: args,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addTrapScore: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              trapScore: args,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

//This is a comment
module.exports = resolvers;
