const { model, Schema } = require("mongoose");

const commentSchema = new Schema({
  id: String,
  articleId: String,
  value: String,
  createdAt: String,
  updatedAt: String,
});

module.exports = model("Comment", commentSchema);
