// Require mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
      type: String,
      trim: true,
      required: "Title is required"
    },
    date: {
      type: Date,
      trim: true,
      required: "Date is required"
    },
    url: {
      type: String,
      trim: true
    },
  },

  {timestamps: true});

var Article = mongoose.model("Article", articleSchema);

module.exports = Article;