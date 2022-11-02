const { model, Schema } = require("mongoose");

const articleSchema = new Schema({
  id: String,
  title: String,
  content: String,
  createdAt: String,
  updatedAt: String,
});

module.exports = model("Article", articleSchema);
