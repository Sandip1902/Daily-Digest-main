const mongoose = require("mongoose");
const { Schema } = mongoose;

const NewsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  urlToImage: {
    type: String,
  },
  url: {
    type: String,
  },
  author: {
    type: String,
  },
  publishedAt: {
    type: String,
  },
  source: {
    name: {
      type: String,
    },
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("news", NewsSchema);
