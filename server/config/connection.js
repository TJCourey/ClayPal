const mongoose = require("mongoose");
const CONFIG = require("../../config.json");

mongoose.connect(process.env.MONGODB_URI || CONFIG.localMongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
