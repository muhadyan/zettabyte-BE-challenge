const Article = require("../models/article");
const Comment = require("../models/comment");

module.exports = {
  Query: {
    async articles(_, { page, view }) {
      const skip = view * (page - 1);
      let getArticles = await Article.find()
        .sort({ createdAt: -1 })
        .limit(view)
        .skip(skip);
      for (const v of getArticles) {
        v.id = v._id.toString();
        let getComments = await Comment.find({ articleId: v.id });
        for (const v of getComments) {
          v.id = v._id.toString();
        }
        v.comments = getComments;
      }

      const count = await Article.find().sort({ createdAt: -1 }).count();

      return {
        data: getArticles,
        page: page,
        view: view,
        totalData: count,
        totalPage: Math.ceil(count / view),
      };
    },
    async comments(_, { articleID }) {
      let getComments = await Comment.find({ articleId: articleID });
      for (const v of getComments) {
        v.id = v._id.toString();
      }

      return getComments;
    },
  },
  Mutation: {
    async createArticle(_, { data: { title, content } }) {
      const createdArticle = new Article({
        title: title,
        content: content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      const res = await createdArticle.save();

      return {
        id: res._id.toString(),
        ...res._doc,
      };
    },
    async editArticle(_, { ID, data: { title, content } }) {
      const isUpdated = (
        await Article.updateOne(
          { _id: ID },
          {
            title: title,
            content: content,
            updatedAt: new Date().toISOString(),
          }
        )
      ).modifiedCount;
      return isUpdated;
    },
    async deleteArticle(_, { ID }) {
      const isDeleted = (await Article.deleteOne({ _id: ID })).deletedCount;
      return isDeleted;
    },

    async createComment(_, { data: { articleId, value } }) {
      const createdComment = new Comment({
        articleId: articleId,
        value: value,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      const res = await createdComment.save();

      return {
        id: res._id.toString(),
        ...res._doc,
      };
    },
    async editComment(_, { ID, data: { articleId, value } }) {
      const isUpdated = (
        await Comment.updateOne(
          { _id: ID },
          {
            articleId: articleId,
            value: value,
            updatedAt: new Date().toISOString(),
          }
        )
      ).modifiedCount;
      return isUpdated;
    },
    async deleteComment(_, { ID }) {
      const isDeleted = (await Comment.deleteOne({ _id: ID })).deletedCount;
      return isDeleted;
    },
  },
};
